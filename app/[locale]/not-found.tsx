'use client';

import { usePathname } from 'next/navigation';
import Link from "next/link"
import { Button } from "@/components/ui/button/button"
import Footer from "@/components/layout/footer"
import { getTranslation } from "@/lib/utils/messageLoader"

export default function NotFound() {
  const pathname = usePathname();
  
  // Extraire la locale depuis l'URL
  const segments = pathname.split('/').filter(Boolean);
  const possibleLocales: ("fr" | "en" | "nl")[] = ['fr', 'en', 'nl'];
  const locale: "fr" | "en" | "nl" = 
    segments.length > 0 && possibleLocales.includes(segments[0] as "fr" | "en" | "nl")
      ? (segments[0] as "fr" | "en" | "nl")
      : 'fr';
  
  // Utiliser les traductions depuis les fichiers de messages
  const t = {
    errorCode: getTranslation(locale, 'common', 'errorCode'),
    title: getTranslation(locale, 'common', 'title'),
    description: getTranslation(locale, 'common', 'description'),
    backToHome: getTranslation(locale, 'common', 'backToHome'),
    viewVehicles: getTranslation(locale, 'common', 'viewVehicles'),
  };
  
  return (
    <div className="min-h-screen bg-linear-to-b from-[#001141] via-[#001a5c] to-black flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-6xl sm:text-8xl md:text-9xl font-bold font-montserrat text-white mb-4">
            {t.errorCode}
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-montserrat text-white mb-4">
            {t.title}
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 font-montserrat mb-8">
            {t.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${locale}`}>
              <Button className="bg-[#003CF0] hover:cursor-pointer hover:bg-[#0031c0] text-white px-6 py-3 rounded-lg font-montserrat font-semibold">
                {t.backToHome}
              </Button>
            </Link>
            <Link href={`/${locale}/vehicules`}>
              <Button variant="outline" className="hover:cursor-pointer text-black border-white/30 hover:bg-white/80 px-6 py-3 rounded-lg font-montserrat font-semibold">
                {t.viewVehicles}
              </Button>
            </Link>
          </div>
      </div>
    </div>
    <Footer useStaticTranslations />
  </div>
  )
}
