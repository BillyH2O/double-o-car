"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Composant qui met à jour dynamiquement le lang de <html> selon la locale dans l'URL
 */
export function HtmlLangUpdater() {
  const pathname = usePathname();

  useEffect(() => {
    // Extraire la locale depuis le pathname
    const segments = pathname.split("/").filter(Boolean);
    const possibleLocales = ["fr", "en", "nl"];
    
    let locale = "fr"; // Par défaut
    if (segments.length > 0 && possibleLocales.includes(segments[0])) {
      locale = segments[0];
    }

    // Mettre à jour le lang de <html>
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
  }, [pathname]);

  return null; // Ce composant ne rend rien
}

