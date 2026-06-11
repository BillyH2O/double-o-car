import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, defaultLocale, type Locale } from '@/i18n';
import { siteUrl, siteName, ogLocaleMap } from '@/lib/site';
import WhatsAppFloat from '@/components/layout/WhatsAppFloat';
import "../globals.css";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[l] = `${siteUrl}/${l}`;
  }
  languages['x-default'] = `${siteUrl}/${defaultLocale}`;

  return {
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages,
    },
    openGraph: {
      siteName,
      url: `${siteUrl}/${locale}`,
      locale: ogLocaleMap[locale as Locale] ?? ogLocaleMap[defaultLocale],
      type: "website",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Valider que la locale est supportée
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  // Charger les messages pour la locale
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
      <WhatsAppFloat />
    </NextIntlClientProvider>
  );
}

