"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Component, ReactNode } from "react";
import { getNamespaceTranslations } from "@/lib/utils/messageLoader";

// Helper pour extraire une string depuis les traductions
function getString(translations: Record<string, unknown>, key: string): string {
  const value = translations[key];
  return typeof value === 'string' ? value : '';
}

// Error Boundary pour gérer l'absence de contexte NextIntl
class TranslationErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Composant pour les pages avec contexte NextIntl
function FooterWithTranslations() {
  const pathname = usePathname();
  const t = useTranslations("footer");
  
  const segments = pathname.split('/').filter(Boolean);
  const possibleLocales: ("fr" | "en" | "nl")[] = ['fr', 'en', 'nl'];
  const locale: "fr" | "en" | "nl" = 
    segments.length > 0 && possibleLocales.includes(segments[0] as "fr" | "en" | "nl")
      ? (segments[0] as "fr" | "en" | "nl")
      : 'fr';

  return <FooterContent locale={locale} t={{
    vehicles: t("vehicles"),
    about: t("about"),
    contact: t("contact"),
    legal: t("legal"),
    privacy: t("privacy"),
    developedBy: t("developedBy"),
    studio: t("studio"),
  }} />;
}

// Composant pour les pages sans contexte (admin, not-found)
// Utilise les traductions depuis les fichiers de messages
function FooterWithStaticTranslations() {
  const pathname = usePathname();
  
  // Extraire la locale depuis l'URL
  const segments = pathname.split('/').filter(Boolean);
  const possibleLocales: ("fr" | "en" | "nl")[] = ['fr', 'en', 'nl'];
  const locale: "fr" | "en" | "nl" = 
    segments.length > 0 && possibleLocales.includes(segments[0] as "fr" | "en" | "nl")
      ? (segments[0] as "fr" | "en" | "nl")
      : 'fr';
  
  // Charger les traductions depuis les fichiers de messages
  const footerTranslations = getNamespaceTranslations(locale, 'footer');
  
  return <FooterContent locale={locale} t={{
    vehicles: getString(footerTranslations, 'vehicles'),
    about: getString(footerTranslations, 'about'),
    contact: getString(footerTranslations, 'contact'),
    legal: getString(footerTranslations, 'legal'),
    privacy: getString(footerTranslations, 'privacy'),
    developedBy: getString(footerTranslations, 'developedBy'),
    studio: getString(footerTranslations, 'studio'),
  }} />;
}

// Composant de contenu partagé
function FooterContent({ 
  locale, 
  t 
}: { 
  locale: "fr" | "en" | "nl";
  t: {
    vehicles: string;
    about: string;
    contact: string;
    legal: string;
    privacy: string;
    developedBy: string;
    studio: string;
  };
}) {

  return (
    <footer className="bg-black py-8 sm:py-12 px-4 sm:px-6 border-t border-gray-800">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-center mb-6 sm:mb-8">
          <Link href={`/${locale}`}>
            <Image src="/logo.png" alt="Double-O Car" width={100} height={50} className="object-contain w-20 h-10 sm:w-[100px] sm:h-[50px]" />
          </Link>
        </div>
        <nav className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 font-montserrat font-light font-weight-300 text-[#FFFFFF] text-xs sm:text-sm">
          <Link href={`/${locale}/vehicules`} className="hover:text-white transition-colors">
            {t.vehicles}
          </Link>
          <Link href={`/${locale}/a-propos`} className="hover:text-white transition-colors">
            {t.about}
          </Link>
          <Link href={`/${locale}/contact`} className="hover:text-white transition-colors">
            {t.contact}
          </Link>
          <Link href={`/${locale}/mentions-legales`} className="hover:text-white transition-colors">
            {t.legal}
          </Link>
          <Link href={`/${locale}/politique-de-confidentialite`} className="hover:text-white transition-colors">
            {t.privacy}
          </Link>
        </nav>
        <div className="text-center text-[#D9D9D980] text-xs sm:text-sm mt-6 sm:mt-8">
          {t.developedBy} <span className="text-[#003CF0]">{t.studio}</span> ©
        </div>
      </div>
    </footer>
  );
}

// Composant Footer principal
export default function Footer({ useStaticTranslations }: { useStaticTranslations?: boolean } = {}) {
  const pathname = usePathname();
  
  // Extraire le premier segment du pathname
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];
  const possibleLocales = ['fr', 'en', 'nl'];
  
  const isAdminPath = firstSegment === 'admin';
  const hasLocaleInPath = firstSegment && possibleLocales.includes(firstSegment);
  
  // Admin → toujours français avec traductions depuis les fichiers
  if (isAdminPath) {
    const footerTranslations = getNamespaceTranslations('fr', 'footer');
    return <FooterContent locale="fr" t={{
      vehicles: getString(footerTranslations, 'vehicles'),
      about: getString(footerTranslations, 'about'),
      contact: getString(footerTranslations, 'contact'),
      legal: getString(footerTranslations, 'legal'),
      privacy: getString(footerTranslations, 'privacy'),
      developedBy: getString(footerTranslations, 'developedBy'),
      studio: getString(footerTranslations, 'studio'),
    }} />;
  }
  
  // Pas de locale dans l'URL → français avec traductions depuis les fichiers
  if (!hasLocaleInPath) {
    const footerTranslations = getNamespaceTranslations('fr', 'footer');
    return <FooterContent locale="fr" t={{
      vehicles: getString(footerTranslations, 'vehicles'),
      about: getString(footerTranslations, 'about'),
      contact: getString(footerTranslations, 'contact'),
      legal: getString(footerTranslations, 'legal'),
      privacy: getString(footerTranslations, 'privacy'),
      developedBy: getString(footerTranslations, 'developedBy'),
      studio: getString(footerTranslations, 'studio'),
    }} />;
  }
  
  // Si useStaticTranslations est demandé (ex: page not-found) → utiliser les traductions statiques
  if (useStaticTranslations) {
    return <FooterWithStaticTranslations />;
  }
  
  // Sinon, utiliser les traductions depuis NextIntl (avec Error Boundary au cas où)
  return (
    <TranslationErrorBoundary fallback={<FooterWithStaticTranslations />}>
      <FooterWithTranslations />
    </TranslationErrorBoundary>
  );
}
