export const SITE = {
  name: '4 Web Lab',
  legalName: '4 Web Lab di Fullin Carlo',
  url: 'https://4weblab.it',
  description:
    'Perizia e creazione siti web a Padova. Analizziamo ciò che blocca il tuo sito o progettiamo una presenza digitale che porta contatti.',
  email: 'info@4weblab.it',
  telephone: '+393514656042',
  logo: '/4weblab-logo-header.svg',
} as const;

/** Build an internal canonical URL using the project's trailing-slash rule. */
export const sitePath = (path = '/') => {
  const [pathname, suffix = ''] = path.split(/([?#].*)/, 2);
  const cleanPath = pathname.replace(/^\/+|\/+$/g, '');
  const normalizedPath = pathname === '/' ? '/' : /\.[^/]+$/.test(pathname) ? `/${cleanPath}` : `/${cleanPath}/`;
  return `${SITE.url}${normalizedPath}${suffix}`;
};

export const organizationStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${sitePath('/')}#business`,
  name: SITE.name,
  legalName: SITE.legalName,
  url: sitePath('/'),
  logo: sitePath(SITE.logo),
  email: SITE.email,
  telephone: SITE.telephone,
  vatID: '05765760284',
  description: SITE.description,
  founder: {
    '@type': 'Person',
    name: 'Carlo Fullin',
    sameAs: 'https://www.linkedin.com/in/carlo-fullin-6aa6b73b7/',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    email: SITE.email,
    telephone: SITE.telephone,
    hoursAvailable: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '19:00',
    },
  },
  areaServed: [
    { '@type': 'AdministrativeArea', name: 'Veneto' },
    { '@type': 'City', name: 'Padova' },
    { '@type': 'City', name: 'Venezia' },
  ],
};

export const websiteStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${sitePath('/')}#website`,
  name: SITE.name,
  url: sitePath('/'),
  publisher: { '@id': `${sitePath('/')}#business` },
};


