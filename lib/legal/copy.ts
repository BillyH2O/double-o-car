import type { Locale } from '@/i18n'
import { COMPANY } from './company'

type Block = { title: string; paragraphs: string[]; list?: string[] }

export type LegalDoc = {
  label: string
  title: string
  subtitle: string
  sections: Block[]
}

const fr = {
  mentions: {
    label: 'Informations',
    title: 'MENTIONS LÉGALES',
    subtitle: 'Informations légales concernant Double-O Car',
    sections: [
      {
        title: '1. Éditeur du site',
        paragraphs: [`Le site ${COMPANY.siteHost} est édité par :`],
        list: [
          `Raison sociale / nom commercial : ${COMPANY.legalName}`,
          `Forme juridique : ${COMPANY.legalForm}`,
          `ICE : ${COMPANY.ice}`,
          `Identifiant fiscal (IF) : ${COMPANY.taxId} (à mentionner sur les factures, art. 119 et 145-III du CGI marocain)`,
          `Identifiant de la taxe professionnelle : ${COMPANY.professionalTaxId}`,
          'N° du registre de commerce : non renseigné sur l’attestation fiscale',
          `Siège / établissement : ${COMPANY.address}`,
          `Activité : ${COMPANY.activity}`,
          `Email : ${COMPANY.email}`,
          `Téléphone : ${COMPANY.phoneDisplay}`,
        ],
      },
      {
        title: '2. Directeur de la publication',
        paragraphs: [
          `Le directeur de la publication est le représentant légal de ${COMPANY.legalName}.`,
        ],
      },
      {
        title: '3. Hébergement',
        paragraphs: [
          `Hébergeur : ${COMPANY.host.name}, ${COMPANY.host.address} — ${COMPANY.host.url}`,
        ],
      },
      {
        title: '4. Propriété intellectuelle',
        paragraphs: [
          `L’ensemble du contenu du site (textes, photos, logos, bases de données) est protégé. Toute reproduction non autorisée est interdite.`,
        ],
      },
      {
        title: '5. Données personnelles',
        paragraphs: [
          'Le traitement des données est décrit dans la politique de confidentialité, conformément à la loi marocaine 09-08 et, pour les visiteurs européens, au RGPD.',
        ],
      },
      {
        title: '6. Cookies',
        paragraphs: [
          'Seuls des cookies nécessaires au fonctionnement du site (session, consentement) sont déposés sans choix préalable. Les cookies optionnels nécessitent un consentement explicite. Voir la politique cookies.',
        ],
      },
      {
        title: '7. Droit applicable',
        paragraphs: [
          'Les présentes mentions sont régies par le droit marocain. Les consommateurs européens conservent le bénéfice des dispositions impératives de leur pays de résidence.',
        ],
      },
    ],
  },
  privacy: {
    label: 'Informations',
    title: 'POLITIQUE DE CONFIDENTIALITÉ',
    subtitle: `Dernière mise à jour : ${COMPANY.lastUpdated}`,
    sections: [
      {
        title: '1. Responsable du traitement',
        paragraphs: [
          `${COMPANY.legalName} (SARL) — ICE ${COMPANY.ice} — ${COMPANY.address} — ${COMPANY.email} — ${COMPANY.phoneDisplay}`,
          'Pour les personnes situées dans l’UE, ce traitement s’applique aussi au titre de l’article 3.2 du RGPD (offre de services à des personnes dans l’Union).',
        ],
      },
      {
        title: '2. Données collectées',
        paragraphs: ['Nous traitons uniquement les données nécessaires :'],
        list: [
          'Identité et contact (nom, e-mail, téléphone), si vous nous écrivez',
          'Contenu de vos messages (formulaire, e-mail, WhatsApp), y compris les détails d’une demande de véhicule',
          'Données techniques (IP, logs) et cookies nécessaires',
        ],
      },
      {
        title: '3. Finalités et bases légales',
        paragraphs: [
          'Les conditions de location sont acceptées sur ce site, avant toute demande. WhatsApp sert ensuite à l’échange et à la confirmation, pas à remplacer ces conditions.',
          'Exécution du contrat et intérêt légitime : traiter votre demande de véhicule et vous recontacter.',
          'Consentement : cookies optionnels, le cas échéant.',
        ],
      },
      {
        title: '4. Durées de conservation',
        paragraphs: [],
        list: [
          'Demandes de contact : 3 ans après le dernier échange',
          'Logs techniques : 12 mois',
          'Choix cookies : 6 mois',
        ],
      },
      {
        title: '5. Destinataires et transferts',
        paragraphs: [
          'Destinataires : équipe Double-O Car, Vercel (hébergement), WhatsApp / Meta (conversation et, le cas échéant, conclusion de la vente), e-mail si vous nous écrivez, autorités si la loi l’exige.',
          'Vercel peut traiter des données hors Maroc / UE, avec des garanties contractuelles (clauses types).',
        ],
      },
      {
        title: '6. Vos droits',
        paragraphs: [
          'Vous pouvez demander l’accès, la rectification, l’effacement, la limitation, l’opposition et la portabilité de vos données en écrivant à ' +
            COMPANY.email +
            '.',
          'Réclamation : CNDP (Maroc) — https://www.cndp.ma — et, si vous résidez dans l’UE, l’autorité de votre pays (CNIL en France : www.cnil.fr).',
        ],
      },
    ],
  },
  cookies: {
    label: 'Informations',
    title: 'POLITIQUE COOKIES',
    subtitle: `Dernière mise à jour : ${COMPANY.lastUpdated}`,
    sections: [
      {
        title: '1. Cookies nécessaires',
        paragraphs: [
          'Ils permettent la navigation, la session et la mémorisation de votre choix cookies. Pas de consentement requis.',
        ],
        list: [
          'Session technique',
          'Cookie d’accès administration',
          'Preuve du consentement (6 mois)',
        ],
      },
      {
        title: '2. Cookies optionnels',
        paragraphs: [
          'Aucun cookie de mesure d’audience ou publicitaire n’est déposé à ce jour. S’ils étaient ajoutés, ils exigeraient un consentement (accepter / refuser au même niveau).',
        ],
      },
    ],
  },
  cgl: {
    label: 'Informations',
    title: 'CONDITIONS GÉNÉRALES DE LOCATION',
    subtitle: `Dernière mise à jour : ${COMPANY.lastUpdated}`,
    sections: [
      {
        title: '1. Accord sur le site',
        paragraphs: [
          `Ces conditions s’appliquent à toute demande de location initiée sur ${COMPANY.siteHost}. En cochant la case prévue, vous les acceptez. WhatsApp ou e-mail servent uniquement à l’échange et à la confirmation après cet accord.`,
        ],
      },
      {
        title: '2. Loueur',
        paragraphs: [
          `${COMPANY.legalName}, ${COMPANY.legalForm}, ICE ${COMPANY.ice}, IF ${COMPANY.taxId}, ${COMPANY.address}. Contact : ${COMPANY.email} — ${COMPANY.phoneDisplay}.`,
        ],
      },
      {
        title: '3. Demande',
        paragraphs: [
          'Le site présente les véhicules et enregistre votre demande (dates, modèle). Aucun paiement n’est exigé sur le site. La confirmation (disponibilité, prix final, remise du véhicule) intervient ensuite par message.',
        ],
      },
      {
        title: '4. Conducteur',
        paragraphs: [
          'Âge minimum 21 ans (ou l’âge indiqué pour le véhicule), permis valide depuis au moins 2 ans, pièce d’identité à la prise en charge à Marrakech.',
        ],
      },
      {
        title: '5. Usage',
        paragraphs: [
          'Usage privé, conforme au code de la route marocain. Restitution dans le même état et avec le même niveau de carburant, sauf accord contraire. Assurance, caution et franchise sont précisées à la confirmation.',
        ],
      },
      {
        title: '6. Annulation',
        paragraphs: [
          'Les règles d’annulation sont rappelées lors de la confirmation. Sauf délai plus favorable, une annulation moins de 48 h avant la prise en charge peut entraîner la conservation de tout ou partie des sommes convenues.',
        ],
      },
      {
        title: '7. Rétractation',
        paragraphs: [
          'La location pour une date déterminée peut être exclue du droit de rétractation des consommateurs. Les règles du § 6 s’appliquent alors. Droit marocain, sans priver un consommateur européen de ses protections impératives.',
        ],
      },
    ],
  },
  banner: {
    more: 'En savoir plus',
    accept: 'Tout accepter',
    refuse: 'Tout refuser',
    customize: 'Personnaliser',
    save: 'Enregistrer mes choix',
    hide: 'Masquer le détail',
    analytics: 'Mesure d’audience (optionnel)',
    analyticsHelp: 'Inactif : aucun traceur analytique n’est chargé actuellement.',
  },
} as const

const en: typeof fr = {
  mentions: {
    label: 'Information',
    title: 'LEGAL NOTICE',
    subtitle: 'Legal information about Double-O Car',
    sections: [
      {
        title: '1. Publisher',
        paragraphs: [`${COMPANY.siteHost} is published by:`],
        list: [
          `Trade / company name: ${COMPANY.legalName}`,
          `Legal form: ${COMPANY.legalForm}`,
          `ICE: ${COMPANY.ice}`,
          `Tax ID (IF): ${COMPANY.taxId} (must appear on invoices, arts. 119 and 145-III of the Moroccan General Tax Code)`,
          `Professional tax ID: ${COMPANY.professionalTaxId}`,
          'Commercial register (RC) number: not stated on the tax certificate',
          `Registered office: ${COMPANY.address}`,
          `Activity: ${COMPANY.activity}`,
          `Email: ${COMPANY.email}`,
          `Phone: ${COMPANY.phoneDisplay}`,
        ],
      },
      {
        title: '2. Publication director',
        paragraphs: [`The publication director is the legal representative of ${COMPANY.legalName}.`],
      },
      {
        title: '3. Hosting',
        paragraphs: [`Host: ${COMPANY.host.name}, ${COMPANY.host.address} — ${COMPANY.host.url}`],
      },
      {
        title: '4. Intellectual property',
        paragraphs: ['All site content is protected. Unauthorised copying is prohibited.'],
      },
      {
        title: '5. Personal data',
        paragraphs: [
          'Processing is described in the privacy policy, under Moroccan Law 09-08 and, for EU visitors, the GDPR.',
        ],
      },
      {
        title: '6. Cookies',
        paragraphs: [
          'Only cookies needed to run the site are set without prior choice. Optional cookies require explicit consent. See the cookie policy.',
        ],
      },
      {
        title: '7. Governing law',
        paragraphs: [
          'These notices are governed by Moroccan law. EU consumers keep the mandatory protections of their country of residence.',
        ],
      },
    ],
  },
  privacy: {
    label: 'Information',
    title: 'PRIVACY POLICY',
    subtitle: `Last updated: ${COMPANY.lastUpdated}`,
    sections: [
      {
        title: '1. Controller',
        paragraphs: [
          `${COMPANY.legalName} (SARL) — ICE ${COMPANY.ice} — ${COMPANY.address} — ${COMPANY.email} — ${COMPANY.phoneDisplay}`,
          'For people in the EU, GDPR Article 3.2 also applies (offering services to individuals in the Union).',
        ],
      },
      {
        title: '2. Data we collect',
        paragraphs: ['We only process what is needed:'],
        list: [
          'Identity and contact details, if you write to us',
          'The content of your messages (form, email, WhatsApp)',
          'Technical data (IP, logs) and necessary cookies',
        ],
      },
      {
        title: '3. Purposes and legal bases',
        paragraphs: [
          'Rental terms are accepted on this website before any request. WhatsApp is then used to exchange and confirm, not to replace these terms.',
          'Contract performance and legitimate interest: handling your vehicle request and contacting you back.',
          'Consent: optional cookies, if any.',
        ],
      },
      {
        title: '4. Retention',
        paragraphs: [],
        list: [
          'Contact requests: 3 years after last exchange',
          'Technical logs: 12 months',
          'Cookie choice: 6 months',
        ],
      },
      {
        title: '5. Recipients and transfers',
        paragraphs: [
          'Team Double-O Car, Vercel, WhatsApp / Meta (chat and, where applicable, concluding the sale), email if you write to us, authorities if required by law.',
          'Vercel may process data outside Morocco/the EU under standard contractual clauses.',
        ],
      },
      {
        title: '6. Your rights',
        paragraphs: [
          `Access, rectification, erasure, restriction, objection and portability: ${COMPANY.email}.`,
          'Complaints: CNDP (Morocco) and, if you live in the EU, your local authority (CNIL in France).',
        ],
      },
    ],
  },
  cookies: {
    label: 'Information',
    title: 'COOKIE POLICY',
    subtitle: `Last updated: ${COMPANY.lastUpdated}`,
    sections: [
      {
        title: '1. Strictly necessary cookies',
        paragraphs: [
          'Required for browsing, session and storing your cookie choice. No consent needed.',
        ],
        list: [
          'Technical session',
          'Admin access cookie',
          'Consent record (6 months)',
        ],
      },
      {
        title: '2. Optional cookies',
        paragraphs: [
          'No audience or advertising cookies are set today. If added later, they will require consent, with refuse as easy as accept.',
        ],
      },
    ],
  },
  cgl: {
    label: 'Information',
    title: 'RENTAL TERMS AND CONDITIONS',
    subtitle: `Last updated: ${COMPANY.lastUpdated}`,
    sections: [
      {
        title: '1. Agreement on this website',
        paragraphs: [
          `These terms apply to any rental request started on ${COMPANY.siteHost}. Ticking the box means you accept them. WhatsApp or email are only used afterwards to exchange and confirm.`,
        ],
      },
      {
        title: '2. Lessor',
        paragraphs: [
          `${COMPANY.legalName}, ${COMPANY.legalForm}, ICE ${COMPANY.ice}, IF ${COMPANY.taxId}, ${COMPANY.address}. Contact: ${COMPANY.email} — ${COMPANY.phoneDisplay}.`,
        ],
      },
      {
        title: '3. Request',
        paragraphs: [
          'The site lists vehicles and records your request (dates, model). No payment is taken on the site. Availability, final price and handover are confirmed later by message.',
        ],
      },
      {
        title: '4. Driver',
        paragraphs: [
          'Minimum age 21 (or as stated for the vehicle), valid licence held for at least 2 years, ID at pickup in Marrakech.',
        ],
      },
      {
        title: '5. Use',
        paragraphs: [
          'Private use, in line with Moroccan traffic law. Return the car in the same condition and with the same fuel level unless otherwise agreed. Insurance, deposit and excess are stated at confirmation.',
        ],
      },
      {
        title: '6. Cancellation',
        paragraphs: [
          'Cancellation rules are restated at confirmation. Unless a more favourable period applies, cancelling less than 48 hours before pickup may mean keeping all or part of the agreed amounts.',
        ],
      },
      {
        title: '7. Withdrawal',
        paragraphs: [
          'Hire for a specific date may be excluded from the consumer cooling-off right. Section 6 then applies. Moroccan law, without depriving an EU consumer of mandatory local protections.',
        ],
      },
    ],
  },
  banner: {
    title: 'Cookies',
    body: 'We use cookies that are necessary for the site to work. No advertising cookies are set today. You can refuse optional cookies as easily as you can accept them.',
    more: 'Learn more',
    accept: 'Accept all',
    refuse: 'Reject all',
    customize: 'Customise',
    save: 'Save my choices',
    hide: 'Hide details',
    analytics: 'Audience measurement (optional)',
    analyticsHelp: 'Inactive: no analytics tracker is loaded at the moment.',
  },
}

const nl: typeof fr = {
  mentions: {
    label: 'Informatie',
    title: 'WETTELIJKE VERMELDINGEN',
    subtitle: 'Juridische informatie over Double-O Car',
    sections: [
      {
        title: '1. Uitgever',
        paragraphs: [`${COMPANY.siteHost} wordt uitgegeven door:`],
        list: [
          `Handelsnaam / vennootschap: ${COMPANY.legalName}`,
          `Rechtsvorm: ${COMPANY.legalForm}`,
          `ICE: ${COMPANY.ice}`,
          `Fiscaal identificatienummer (IF): ${COMPANY.taxId} (te vermelden op facturen, art. 119 en 145-III van het Marokkaanse CGI)`,
          `Identificatienummer beroepstaks: ${COMPANY.professionalTaxId}`,
          'Handelsregisternummer (RC): niet vermeld op het fiscale attest',
          `Zetel: ${COMPANY.address}`,
          `Activiteit: ${COMPANY.activity}`,
          `E-mail: ${COMPANY.email}`,
          `Telefoon: ${COMPANY.phoneDisplay}`,
        ],
      },
      {
        title: '2. Publicatiedirecteur',
        paragraphs: [`De publicatiedirecteur is de wettelijke vertegenwoordiger van ${COMPANY.legalName}.`],
      },
      {
        title: '3. Hosting',
        paragraphs: [`Host: ${COMPANY.host.name}, ${COMPANY.host.address} — ${COMPANY.host.url}`],
      },
      {
        title: '4. Intellectuele eigendom',
        paragraphs: ['Alle inhoud van de site is beschermd. Ongeoorloofde reproductie is verboden.'],
      },
      {
        title: '5. Persoonsgegevens',
        paragraphs: [
          'De verwerking staat in het privacybeleid, volgens de Marokkaanse wet 09-08 en, voor EU-bezoekers, de AVG.',
        ],
      },
      {
        title: '6. Cookies',
        paragraphs: [
          'Alleen noodzakelijke cookies worden zonder voorafgaande keuze geplaatst. Optionele cookies vereisen uitdrukkelijke toestemming. Zie het cookiebeleid.',
        ],
      },
      {
        title: '7. Toepasselijk recht',
        paragraphs: [
          'Marokkaans recht. EU-consumenten behouden de dwingende bescherming van hun woonland.',
        ],
      },
    ],
  },
  privacy: {
    label: 'Informatie',
    title: 'PRIVACYBELEID',
    subtitle: `Laatst bijgewerkt: ${COMPANY.lastUpdated}`,
    sections: [
      {
        title: '1. Verwerkingsverantwoordelijke',
        paragraphs: [
          `${COMPANY.legalName} (SARL) — ICE ${COMPANY.ice} — ${COMPANY.address} — ${COMPANY.email} — ${COMPANY.phoneDisplay}`,
          'Voor personen in de EU geldt ook art. 3.2 AVG (diensten aanbieden aan personen in de Unie).',
        ],
      },
      {
        title: '2. Gegevens',
        paragraphs: ['We verwerken alleen wat nodig is:'],
        list: [
          'Identiteit en contactgegevens, als u ons schrijft',
          'Inhoud van uw berichten (formulier, e-mail, WhatsApp)',
          'Technische gegevens (IP, logs) en noodzakelijke cookies',
        ],
      },
      {
        title: '3. Doelen en grondslagen',
        paragraphs: [
          'De huurvoorwaarden worden op deze website aanvaard vóór elke aanvraag. WhatsApp dient daarna voor overleg en bevestiging, niet om deze voorwaarden te vervangen.',
          'Uitvoering van de overeenkomst en gerechtvaardigd belang: uw voertuigaanvraag behandelen en u terugcontacteren.',
          'Toestemming: optionele cookies, indien van toepassing.',
        ],
      },
      {
        title: '4. Bewaartermijnen',
        paragraphs: [],
        list: [
          'Contactaanvragen: 3 jaar na laatste contact',
          'Technische logs: 12 maanden',
          'Cookiekeuze: 6 maanden',
        ],
      },
      {
        title: '5. Ontvangers en doorgiften',
        paragraphs: [
          'Team Double-O Car, Vercel, WhatsApp / Meta (gesprek en, in voorkomend geval, het sluiten van de verkoop), e-mail indien u ons schrijft, overheden indien wettelijk verplicht.',
          'Vercel kan gegevens buiten Marokko/de EU verwerken op basis van standaardcontractbepalingen.',
        ],
      },
      {
        title: '6. Uw rechten',
        paragraphs: [
          `Inzage, rectificatie, wissen, beperking, bezwaar en overdraagbaarheid: ${COMPANY.email}.`,
          'Klacht: CNDP (Marokko) en, bij woonplaats in de EU, uw lokale autoriteit (CNIL in Frankrijk).',
        ],
      },
    ],
  },
  cookies: {
    label: 'Informatie',
    title: 'COOKIEBELEID',
    subtitle: `Laatst bijgewerkt: ${COMPANY.lastUpdated}`,
    sections: [
      {
        title: '1. Noodzakelijke cookies',
        paragraphs: [
          'Nodig voor navigatie, sessie en het bewaren van uw cookiekeuze. Geen toestemming vereist.',
        ],
        list: [
          'Technische sessie',
          'Admin-toegangscookie',
          'Toestemmingsbewijs (6 maanden)',
        ],
      },
      {
        title: '2. Optionele cookies',
        paragraphs: [
          'Er worden momenteel geen audience- of advertentiecookies geplaatst. Indien later toegevoegd, is toestemming vereist, met weigeren even eenvoudig als aanvaarden.',
        ],
      },
    ],
  },
  cgl: {
    label: 'Informatie',
    title: 'ALGEMENE HUURVOORWAARDEN',
    subtitle: `Laatst bijgewerkt: ${COMPANY.lastUpdated}`,
    sections: [
      {
        title: '1. Akkoord op de website',
        paragraphs: [
          `Deze voorwaarden gelden voor elke huuraanvraag via ${COMPANY.siteHost}. Door het vakje aan te vinken, aanvaardt u ze. WhatsApp of e-mail dienen daarna alleen voor overleg en bevestiging.`,
        ],
      },
      {
        title: '2. Verhuurder',
        paragraphs: [
          `${COMPANY.legalName}, ${COMPANY.legalForm}, ICE ${COMPANY.ice}, IF ${COMPANY.taxId}, ${COMPANY.address}. Contact: ${COMPANY.email} — ${COMPANY.phoneDisplay}.`,
        ],
      },
      {
        title: '3. Aanvraag',
        paragraphs: [
          'De site toont de voertuigen en registreert uw aanvraag (data, model). Er wordt geen betaling op de site gevraagd. Beschikbaarheid, eindprijs en overdracht worden later per bericht bevestigd.',
        ],
      },
      {
        title: '4. Bestuurder',
        paragraphs: [
          'Minimumleeftijd 21 jaar (of zoals vermeld voor het voertuig), geldig rijbewijs sinds minstens 2 jaar, identiteitsbewijs bij ophaling in Marrakech.',
        ],
      },
      {
        title: '5. Gebruik',
        paragraphs: [
          'Privégebruik, volgens de Marokkaanse verkeerswet. Lever de wagen terug in dezelfde staat en met hetzelfde brandstofniveau, tenzij anders afgesproken. Verzekering, waarborg en franchise worden bij bevestiging meegedeeld.',
        ],
      },
      {
        title: '6. Annulering',
        paragraphs: [
          'Annuleringsregels worden bij bevestiging herhaald. Tenzij een gunstigere termijn geldt, kan annuleren minder dan 48 uur voor ophaling leiden tot behoud van het geheel of een deel van de afgesproken bedragen.',
        ],
      },
      {
        title: '7. Herroepingsrecht',
        paragraphs: [
          'Huur voor een bepaalde datum kan uitgesloten zijn van het consumentenherroepingsrecht. Dan geldt § 6. Marokkaans recht, zonder een EU-consument de dwingende bescherming van zijn woonland te ontnemen.',
        ],
      },
    ],
  },
  banner: {
    title: 'Cookies',
    body: 'We gebruiken cookies die nodig zijn voor het functioneren van de site. Er worden vandaag geen advertentiecookies geplaatst. U kunt optionele cookies even makkelijk weigeren als aanvaarden.',
    more: 'Meer informatie',
    accept: 'Alles aanvaarden',
    refuse: 'Alles weigeren',
    customize: 'Aanpassen',
    save: 'Mijn keuzes opslaan',
    hide: 'Details verbergen',
    analytics: 'Audiencemeting (optioneel)',
    analyticsHelp: 'Inactief: er wordt momenteel geen analytische tracker geladen.',
  },
}

const byLocale: Record<Locale, typeof fr> = { fr, en, nl }

export function getLegalCopy(locale: string): typeof fr {
  if (locale === 'en' || locale === 'nl' || locale === 'fr') return byLocale[locale]
  return fr
}
