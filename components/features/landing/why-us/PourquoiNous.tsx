"use client";

import { Users, Car, Star, Clock } from "lucide-react";
import { useTranslations } from "next-intl";

interface StatItem {
  icon: React.ReactNode;
  number: string;
  label: string;
}

export default function PourquoiNous() {
  const t = useTranslations('whyUs');
  const stats: StatItem[] = [
    {
      icon: <Users className="w-8 h-8" />,
      number: t("items.0.number"),
      label: t("items.0.label"),
    },
    {
      icon: <Car className="w-8 h-8" />,
      number: t("items.1.number"),
      label: t("items.1.label"),
    },
    {
      icon: <Star className="w-8 h-8" />,
      number: t("items.2.number"),
      label: t("items.2.label"),
    },
    {
      icon: <Clock className="w-8 h-8" />,
      number: t("items.3.number"),
      label: t("items.3.label"),
    },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 relative">
      <div className="container px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14 mx-auto max-w-7xl">
        <div className="flex flex-col items-center mb-8 md:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-montserrat font-bold text-white mb-4">
            {t("title")}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 md:p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              {/* Icône avec fond bleu */}
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#003CF0] flex items-center justify-center mb-4 md:mb-6 text-white">
                {stat.icon}
              </div>
              
              {/* Chiffre */}
              <div className="text-3xl sm:text-4xl md:text-5xl font-montserrat font-bold text-white mb-2 md:mb-3">
                {stat.number}
              </div>
              
              {/* Label */}
              <div className="text-base sm:text-lg md:text-xl font-montserrat font-medium text-white/90">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


