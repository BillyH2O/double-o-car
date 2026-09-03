/**
 * Identité DOUBLE O CAR — attestation d’identifiant fiscal (6 juin 2024).
 * RC et nom du dirigeant absents du document : non inventés.
 */
export const COMPANY = {
  tradeName: 'Double-O Car',
  legalName: 'DOUBLE O CAR',
  legalForm: 'SARL',
  ice: '003488300000087',
  taxId: '65913439',
  professionalTaxId: '67107412',
  activity: 'Automobiles, loueur de véhicules',
  city: 'Marrakech, Maroc',
  address: 'N° 500 MAG RDC LOT SOCOMA 1, Marrakech, Maroc',
  email: 'doubleocar@gmail.com',
  phoneDisplay: '+33 6 11 33 87 78',
  phoneTel: '+33611338778',
  siteHost: 'doubleocar.com',
  siteUrl: 'https://doubleocar.com',
  host: {
    name: 'Vercel Inc.',
    address: '440 N Barranca Ave #4133, Covina, CA 91723, États-Unis',
    url: 'https://vercel.com',
  },
  lastUpdated: '3 septembre 2026',
} as const

export const LEGAL_PATHS = {
  mentions: '/mentions-legales',
  privacy: '/politique-de-confidentialite',
  cookies: '/politique-cookies',
  cgl: '/conditions-generales-de-location',
} as const
