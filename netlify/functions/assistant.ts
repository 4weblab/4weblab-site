import { ASSISTANT_KNOWLEDGE_BASE } from './assistant-kb';

type ChatMessage = { role: 'user' | 'assistant'; content: string };
type ContactPrefill = { servizio: string; tipo_attivita: string; zona: string; esigenza: string; url_sito_attuale?: string };

const SERVICE_OPTIONS = new Set(['perizia_essential', 'perizia_premium', 'sito_per_negozio', 'sito_per_professionisti', 'sito_aziendale', 'progetto_su_misura', 'google_ads', 'chatgpt_ads', 'valutazione_servizio']);
const MAX_MESSAGES = 12;
const MAX_MESSAGE_LENGTH = 750;
const MAX_TOTAL_LENGTH = 5_000;
const REQUEST_WINDOW_MS = 10 * 60 * 1_000;
const REQUEST_LIMIT = 12;
const rateLimit = new Map<string, { count: number; expiresAt: number }>();

const json = (body: unknown, status = 200) => Response.json(body, { status, headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' } });
const trim = (value: unknown, length: number) => typeof value === 'string' ? value.trim().slice(0, length) : '';

function allowedOrigin(request: Request) {
  const origin = request.headers.get('origin');
  if (!origin) return false;
  if (origin === new URL(request.url).origin) return true;
  if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(origin)) return true;
  const configured = process.env.ASSISTANT_ALLOWED_ORIGINS?.split(',').map((entry) => entry.trim()).filter(Boolean) ?? ['https://4weblab.it', 'https://www.4weblab.it'];
  return configured.includes(origin);
}

async function withinRateLimit(request: Request) {
  const ip = request.headers.get('x-nf-client-connection-ip') ?? 'unknown';
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(ip));
  const key = Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
  const now = Date.now();
  const existing = rateLimit.get(key);
  if (!existing || existing.expiresAt <= now) { rateLimit.set(key, { count: 1, expiresAt: now + REQUEST_WINDOW_MS }); return true; }
  if (existing.count >= REQUEST_LIMIT) return false;
  existing.count += 1;
  return true;
}

function sanitizeMessages(input: unknown): ChatMessage[] | null {
  if (!Array.isArray(input)) return null;
  const cleaned = input.filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === 'object')
    .map((item) => ({ role: item.role, content: trim(item.content, MAX_MESSAGE_LENGTH) }))
    .filter((item): item is ChatMessage => (item.role === 'user' || item.role === 'assistant') && Boolean(item.content)).slice(-MAX_MESSAGES);
  const total = cleaned.reduce((sum, message) => sum + message.content.length, 0);
  if (!cleaned.length || total > MAX_TOTAL_LENGTH || cleaned[0]?.role !== 'user' || cleaned.at(-1)?.role !== 'user') return null;
  return cleaned;
}

function redactQuestion(question: string) {
  return question.replace(/[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/g, '[rimosso]').replace(/(?:\+?39\s*)?(?:\d[\s.-]*){8,14}/g, '[rimosso]');
}

function contactPrefill(value: unknown): ContactPrefill {
  const raw = value && typeof value === 'object' ? value as Record<string, unknown> : {};
  const servizio = trim(raw.servizio, 60);
  const url = trim(raw.url_sito_attuale, 200);
  return { servizio: SERVICE_OPTIONS.has(servizio) ? servizio : 'valutazione_servizio', tipo_attivita: trim(raw.tipo_attivita, 100), zona: trim(raw.zona, 100), esigenza: trim(raw.esigenza, 200), ...(url.startsWith('http://') || url.startsWith('https://') ? { url_sito_attuale: url } : {}) };
}

function extractResponse(payload: Record<string, unknown>) {
  const output = Array.isArray(payload.output) ? payload.output : [];
  let reply = ''; let action: ContactPrefill | null = null;
  for (const item of output) {
    if (!item || typeof item !== 'object') continue;
    const record = item as Record<string, unknown>;
    if (record.type === 'message' && Array.isArray(record.content)) for (const content of record.content) {
      if (content && typeof content === 'object' && (content as Record<string, unknown>).type === 'output_text') reply += trim((content as Record<string, unknown>).text, 1_200);
    }
    if (record.type === 'function_call' && record.name === 'propose_contact_card') {
      try { action = contactPrefill(JSON.parse(String(record.arguments ?? '{}'))); } catch { action = contactPrefill({}); }
    }
  }
  return { reply: reply.trim(), action };
}

export default async function assistant(request: Request): Promise<Response> {
  if (request.method !== 'POST') return json({ error: 'method_not_allowed', message: 'Metodo non consentito.' }, 405);
  if (process.env.ASSISTANT_ENABLED === 'false') return json({ error: 'unavailable', message: 'Assistente momentaneamente non disponibile: ci scriva dal modulo contatti.' }, 503);
  if (!allowedOrigin(request)) return json({ error: 'forbidden', message: 'Richiesta non autorizzata.' }, 403);
  if (!(await withinRateLimit(request))) return json({ error: 'rate_limited', message: 'Hai inviato molte richieste in poco tempo. Riprova tra qualche minuto o scrivici dal modulo contatti.' }, 429);

  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return json({ error: 'invalid_request', message: 'Messaggio non valido. Riprova.' }, 400); }
  const messages = sanitizeMessages(body.messages);
  if (!messages) return json({ error: 'invalid_request', message: 'Messaggio non valido. Riprova.' }, 400);
  const pagePath = trim(body.pagePath, 120);
  const currentPage = pagePath.startsWith('/') ? pagePath : '';
  if (process.env.ASSISTANT_LOG_QUESTIONS === 'true') console.info('assistant_question', redactQuestion(messages.at(-1)?.content ?? ''));

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return json({ error: 'unavailable', message: 'Assistente momentaneamente non disponibile: ci scriva dal modulo contatti.' }, 503);

  try {
    const upstream = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST', signal: AbortSignal.timeout(8_000), headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: process.env.ASSISTANT_MODEL || 'gpt-6-luna', store: false, reasoning: { effort: 'none' }, max_output_tokens: 320,
        instructions: `${ASSISTANT_KNOWLEDGE_BASE}\nPagina che il visitatore sta leggendo: ${currentPage || 'non disponibile'}.`,
        input: messages.map((message) => ({ role: message.role, content: [{ type: 'input_text', text: message.content }] })),
        tools: [{ type: 'function', name: 'propose_contact_card', description: 'Propone una scheda riepilogativa da mostrare al visitatore prima del modulo contatti. Non raccoglie dati personali.', strict: true, parameters: { type: 'object', additionalProperties: false, required: ['servizio', 'tipo_attivita', 'zona', 'esigenza', 'url_sito_attuale'], properties: { servizio: { type: 'string', enum: [...SERVICE_OPTIONS] }, tipo_attivita: { type: 'string' }, zona: { type: 'string' }, esigenza: { type: 'string' }, url_sito_attuale: { type: ['string', 'null'] } } } }],
      }),
    });
    if (!upstream.ok) throw new Error(`OpenAI response ${upstream.status}`);
    const result = extractResponse(await upstream.json() as Record<string, unknown>);
    const reply = result.reply || (result.action ? 'Perfetto, Le preparo un riepilogo da controllare prima di contattarci.' : 'Non riesco a formulare una risposta utile. Può raccontarci il suo obiettivo dal modulo contatti o su WhatsApp?');
    return json({ reply, action: result.action ? { type: 'show_contact_card', prefill: result.action } : null });
  } catch {
    return json({ error: 'assistant_error', message: 'Non riesco a rispondere ora. Può contattarci dal modulo o su WhatsApp.' }, 502);
  }
}

export const config = { method: 'POST' };
