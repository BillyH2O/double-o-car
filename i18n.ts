import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

// Liste des locales supportées
export const locales = ['fr', 'en', 'nl'] as const;
export type Locale = (typeof locales)[number];

// Locale par défaut
export const defaultLocale: Locale = 'fr';

export default getRequestConfig(async ({ requestLocale }) => {
  // Récupérer la locale depuis la requête
  const locale = await requestLocale;
  
  // Valider que la locale demandée est supportée
  if (!locale || !locales.includes(locale as Locale)) {
    notFound();
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});

