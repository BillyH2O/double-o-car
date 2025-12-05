import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/i18n';
import "../globals.css";

export const metadata: Metadata = {
  title: "Double-O Car - Location de voitures",
  description: "Louez votre voiture en toute simplicité",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Double-O Car - Location de voitures",
    description: "Louez votre voiture en toute simplicité",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Double-O Car Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Double-O Car - Location de voitures",
    description: "Louez votre voiture en toute simplicité",
    images: ["/logo.png"],
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
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
    </NextIntlClientProvider>
  );
}

