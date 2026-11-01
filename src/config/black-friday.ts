/** Set enabled to false, rebuild and publish to restore the ordinary service pages. */
export const BLACK_FRIDAY = {
  enabled: true,
  campaign: 'black_friday_2026',
  startsAt: '2026-11-02T00:00:00+01:00',
  endsAt: '2026-11-27T23:59:59+01:00',
  dates: 'Dal 2 al 27 novembre 2026',
  discount: 25,
  plans: {
    professionisti: { name: 'Professionisti', ordinary: 990, path: '/sito-web-per-professionisti/', contact: '#contatti-professionisti' },
    aziende: { name: 'Aziende', ordinary: 1890, path: '/sito-web-aziendale/', contact: '#contatti-aziendali' },
  },
} as const;

export type BlackFridayPlan = keyof typeof BLACK_FRIDAY.plans;

export function blackFridayState(now = new Date(), enabled: boolean = BLACK_FRIDAY.enabled) {
  const visible = enabled && now.getTime() <= Date.parse(BLACK_FRIDAY.endsAt);
  return { visible, upcoming: visible && now.getTime() < Date.parse(BLACK_FRIDAY.startsAt) };
}

// The environment switch also allows a complete fallback build to be verified locally.
export const blackFriday = blackFridayState(new Date(), BLACK_FRIDAY.enabled && process.env.BLACK_FRIDAY_ENABLED !== 'false');
export const promoPrice = (plan: BlackFridayPlan) => Math.round(BLACK_FRIDAY.plans[plan].ordinary * (100 - BLACK_FRIDAY.discount)) / 100;
export const euro = (amount: number) => new Intl.NumberFormat('it-IT', { minimumFractionDigits: Number.isInteger(amount) ? 0 : 2, maximumFractionDigits: 2, useGrouping: 'always' }).format(amount);

export function serviceOffer(plan: BlackFridayPlan, url: string) {
  return {
    '@type': 'Offer',
    url,
    priceCurrency: 'EUR',
    priceSpecification: {
      '@type': 'PriceSpecification',
      minPrice: String(blackFriday.visible ? promoPrice(plan) : BLACK_FRIDAY.plans[plan].ordinary),
      priceCurrency: 'EUR',
      valueAddedTaxIncluded: false,
    },
    ...(blackFriday.visible ? {
      name: `Black Friday 2026 · ${BLACK_FRIDAY.plans[plan].name}`,
      validFrom: BLACK_FRIDAY.startsAt,
      validThrough: BLACK_FRIDAY.endsAt,
      description: 'Prezzo di partenza per la realizzazione iniziale di un nuovo sito. Preventivo da confermare entro il 27 novembre 2026. Hosting e servizi ricorrenti esclusi.',
    } : {}),
  };
}

export const blackFridayFaqs = [
  ['Come funziona il Black Friday?', 'Dal 2 al 27 novembre 2026, il 25% di sconto si applica alla realizzazione iniziale di nuovi siti per professionisti e aziende. Non riguarda il piano Negozi e attività locali, restyling, interventi parziali, hosting o servizi ricorrenti.'],
  ['Come si conferma l’offerta?', 'Inviare il modulo serve a richiedere un preventivo e non lo conferma. Per aderire alla promozione il preventivo deve essere confermato entro il 27 novembre 2026 compreso; non è necessario che l’acconto sia già contabilizzato entro quella data. La consegna viene concordata per ogni progetto.'],
];
