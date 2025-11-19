"use client";

import Image from "next/image";
import { useState } from "react";
import TextBlend from "@/components/ui/text/TextBlend";
import CompactBookingForm from "@/components/form/CompactBookingForm";
import BookingForm from "@/components/form/BookingForm";
import CarList from "@/components/vehicles/CarList";

const HeroSectionBanner = () => {
  const [showResults, setShowResults] = useState(false);

  if (showResults) {
    return <CarList />;
  }

  return (
    <section className="container mx-auto max-w-7xl px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14 min-h-[600px] md:min-h-[600px] pt-42">
      {/* Container avec flexbox pour texte à gauche et image à droite */}
      <div className=" relative h-full flex flex-col-reverse md:flex-row items-center justify-between gap-2 sm:gap-16 z-10">
        {/* Texte à gauche */}
        <div className="flex-1 w-full md:w-auto flex flex-col justify-center gap-8">
          <TextBlend align="left" />
        </div>

        {/* Image à droite - cachée sur mobile */}
        <div className="hidden md:block flex-1 w-full md:w-auto items-center justify-center md:justify-end">
          <Image
            src="/car2.png"
            alt="Voiture"
            width={800}
            height={600}
            className="w-full max-w-[200px] md:max-w-[600px] h-auto object-contain mx-auto"
            priority
          />
        </div>
      </div>

      {/* Formulaire - BookingForm sur mobile, CompactBookingForm sur desktop */}
      <div className="relative flex items-center justify-center w-full max-w-6xl mx-auto px-4 -mt-6 z-0">
      <div className="block md:hidden">
          <BookingForm onSearch={() => setShowResults(true)} />
        </div>
        <div className="w-full hidden md:block">
          <CompactBookingForm />
        </div>
      </div>
    </section>
  );
};

export default HeroSectionBanner;

