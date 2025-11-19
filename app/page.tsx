"use client";

import Footer from "@/components/layout/footer";
import Simplicity from "@/components/features/landing/about-us/Simplicity";
import { TestimonialsSection } from "@/components/features/landing/testimonies/testimonials-with-marquee";
import { reviews } from "@/data/reviews";
import { Navbar } from "@/components/layout/navbar";
import FAQsThree from "@/components/features/landing/faq/FAQSection";
import { Caroussel } from "@/components/features/landing/caroussel/Caroussel";
import VehicleBrands from "@/components/vehicles/VehicleBrands";
import PourquoiNous from "@/components/features/landing/why-us/PourquoiNous";
import HeroSection3 from "@/components/features/hero/HeroSection3";
import { CTASection } from "@/components/features/landing/cta/cta-with-rectangle";

export default function Home() {

  return (
    <div className="min-h-screen bg-linear-to-t from-black via-blue-950 to-black">
      <Navbar />

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center gap-32">
        
        <HeroSection3 backgroundImage="/hero1.png" title="Prenez la route, On s'occupe du reste." description="Pensé pour vous rendre votre expérience plus agréable" darkEffect={true}/>
        <div className="hidden md:block"><VehicleBrands /></div>
      </div>

      <div className="dark mt-24 w-full mx-auto">
      
      <PourquoiNous/>
      <TestimonialsSection title="Avis des clients" description="Nos clients nous ont dit" className="dark" testimonials={reviews.map((review) => ({
        author: {
          name: review.name,
          handle: review.name,
          avatar: "/avatar.jpg"
        },
        text: review.comment
      }))} />

    <div className="dark mt-24 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14">
        <FAQsThree />
        <Caroussel />
        <Simplicity />
        <CTASection
      badge={{
        text: "Offres spéciales"
      }}
      title="Qu'attendez-vous ?"
      description="Réservez votre véhicule en ligne et profitez de nos meilleures offres"
      action={{
        text: "Réserver",
        href: "/vehicules",
        variant: "default"
      }}
    />
      </div>

      <Footer />
      </div>
    </div>
  );
}
