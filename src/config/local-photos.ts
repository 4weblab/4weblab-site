export const localPhotos = {
  padova: {
    hero: '/images/professionisti-hero-background.webp',
    intro: '/images/professionisti-direction-3/dossier-progetto.webp',
  },
  legnaro: {
    hero: '/images/aziendali-hero-background.webp',
    intro: '/images/aziendali-team.webp',
  },
  'piove-di-sacco': {
    hero: '/images/home-test/hero-negozio.webp',
    intro: '/images/home-test/hero-studio.webp',
  },
  'ponte-san-nicolo': {
    hero: '/images/home-test/azienda.webp',
    intro: '/images/aziendali-mockup.webp',
  },
  albignasego: {
    hero: '/images/negozi-direction-1/fioreria.webp',
    intro: '/images/negozi-mobile-search.webp',
  },
  vigonza: {
    hero: '/images/negozi-storefront.webp',
    intro: '/images/negozi-direction-1/abbigliamento.webp',
  },
  'abano-terme': {
    hero: '/images/home-test/professionista.webp',
    intro: '/images/professionisti-direction-3/materiali-testi.webp',
  },
  cittadella: {
    hero: '/images/negozi-direction-1/bottega-ceramica.webp',
    intro: '/images/negozi-direction-1/lavorazione-ceramica.webp',
  },
} satisfies Record<keyof typeof import('./zones').areas, { hero: string; intro: string }>;
