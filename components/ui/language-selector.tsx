"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

const languages = [
  { code: "fr", name: "Français", imageUrl: "/FR.png" },
  { code: "en", name: "English", imageUrl: "/GB.png" },
  { code: "nl", name: "Nederlands", imageUrl: "/NL.png" },
] as const;

type LanguageSelectorProps = {
  mobile?: boolean;
};

export function LanguageSelector({ mobile = false }: LanguageSelectorProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = languages.find((lang) => lang.code === locale) || languages[0];

  const handleLanguageChange = (newLocale: string) => {
    // Remplacer la locale actuelle dans le pathname
    const segments = pathname.split("/");
    segments[1] = newLocale; // Le segment [1] est la locale
    const newPath = segments.join("/");
    
    router.push(newPath);
    setIsOpen(false);
  };

  // Fermer le dropdown quand on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  if (mobile) {
    return (
      <div className="w-full">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between gap-2 px-4 py-3 rounded-md text-white hover:bg-white/10 transition-colors border border-white/20"
          aria-label="Select language"
        >
          <span className="text-xl">
            <Image src={currentLanguage.imageUrl} alt={currentLanguage.name} width={24} height={24} className="w-8 h-5" />
          </span>
          <ChevronDown className={`h-5 w-6 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </button>

        {isOpen && (
          <div className="mt-2 w-full bg-black/80 backdrop-blur-sm rounded-md border border-white/20 overflow-hidden">
            <div className="py-1 flex flex-col">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  className={`w-full flex items-center justify-center px-4 py-3 hover:bg-white/10 transition-colors ${
                    locale === language.code ? "bg-black/80" : ""
                  }`}
                >
                  <span className="text-xl">
                    <Image src={language.imageUrl} alt={language.name} width={24} height={24} className="w-8 h-5" />
                  </span>
                  {locale === language.code && (
                    <span className="ml-2 text-[#003CF0]">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-md text-white hover:bg-black/80 transition-colors"
        aria-label="Select language"
      >
        <span className="text-xl">
          <Image src={currentLanguage.imageUrl} alt={currentLanguage.name} width={24} height={24} className="w-8 h-5" />
        </span>
        <ChevronDown className={`h-6 w-6 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 bg-black/80 backdrop-blur-sm rounded-md shadow-lg z-50 border border-white/20">
          <div className="py-1 flex flex-col">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={`w-full flex items-center justify-center px-4 py-3 hover:bg-white/30 transition-colors ${
                  locale === language.code ? "bg-white/10" : ""
                }`}
              >
                <span className="text-xl">
                  <Image src={language.imageUrl} alt={language.name} width={24} height={24} className="w-8 h-5" />
                </span>
                {locale === language.code && (
                  <span className="ml-2 text-[#003CF0]">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

