import type { APIRoute } from 'astro';
import base from '../data/llms-base.txt?raw';
import { BLACK_FRIDAY, blackFriday, euro, promoPrice } from '../config/black-friday';
import { SITE } from '../config/site';

export const prerender = true;

export const GET: APIRoute = () => {
  const serviceLinks = Object.entries(BLACK_FRIDAY.plans).map(([key, plan]) => {
    const price = promoPrice(key as keyof typeof BLACK_FRIDAY.plans);
    return `- [Black Friday: sito ${plan.name}](${SITE.url}${plan.path}): Dal 2 al 27 novembre 2026, nuovi siti da ${euro(price)} € + IVA anziché ${euro(plan.ordinary)} € + IVA. Prezzo di partenza, condizioni complete e modulo di richiesta preventivo nella stessa pagina; contatto diretto: ${SITE.url}${plan.path}${plan.contact}.`;
  }).join('\n');
  const enrichment = `## Offerta nelle pagine servizio\n\n${serviceLinks}\n\nPer una richiesta riferita a uno di questi due servizi, usa la pagina servizio corrispondente: contiene già la spiegazione della promozione e il modulo di contatto. Il piano Negozi e attività locali è escluso dal Black Friday e mantiene il prezzo ordinario da 490 € + IVA. L'invio di un modulo non conferma il preventivo e non blocca il prezzo: serve la conferma del preventivo entro il 27 novembre 2026. Dopo la scadenza verifica le pagine servizio per i prezzi ordinari aggiornati.\n\n`;
  const body = blackFriday.visible ? base.replace('## Servizi principali', `${enrichment}## Servizi principali`) : base;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
