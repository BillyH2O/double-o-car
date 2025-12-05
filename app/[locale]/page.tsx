"use client";

import { useTranslations } from 'next-intl';
import Footer from "@/components/layout/footer";
import Simplicity from "@/components/features/landing/about-us/Simplicity";
import { TestimonialsSection } from "@/components/features/landing/testimonies/testimonials-with-marquee";
import { Navbar } from "@/components/layout/navbar";
import FAQsThree from "@/components/features/landing/faq/FAQSection";
import PourquoiNous from "@/components/features/landing/why-us/PourquoiNous";
import HeroSection3 from "@/components/features/hero/HeroSection3";
import { CTASection } from "@/components/features/landing/cta/cta-with-rectangle";
import VehicleBrands from '@/components/vehicles/VehicleBrands';

export default function Home() {
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-linear-to-t from-black via-blue-950 to-black">
      <Navbar />

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center gap-24 xl:gap-96">
        
        <HeroSection3 
          backgroundImage="/hero1.png" 
          title={t('hero.title')} 
          description={t('hero.description')} 
          darkEffect={true}
        />
        <VehicleBrands />
      </div>

      <div className="dark mt-16 sm:mt-20 md:mt-24 w-full mx-auto flex flex-col gap-16 sm:gap-20 md:gap-24">
      
      <PourquoiNous/>
      <section id="avis">
        <TestimonialsSection 
          title={t('testimonials.title')} 
          description={t('testimonials.description')} 
          className="dark" 
          testimonials={[
            {
              author: {
                name: t('testimonials.items.0.name'),
                avatar: "/avatar.jpg"
              },
              text: t('testimonials.items.0.comment')
            },
            {
              author: {
                name: t('testimonials.items.1.name'),
                avatar: "/avatar.jpg"
              },
              text: t('testimonials.items.1.comment')
            },
            {
              author: {
                name: t('testimonials.items.2.name'),
                avatar: "/avatar.jpg"
              },
              text: t('testimonials.items.2.comment')
            }
          ]} 
        />
      </section>

    <div className="dark w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14 flex flex-col gap-16 sm:gap-20 md:gap-24">
        <section id="faq">
          <FAQsThree />
        </section>
        {/* <Caroussel /> */}
        <Simplicity />
        <CTASection
      badge={{
        text: t('cta.badge')
      }}
      title={t('cta.title')}
      description={t('cta.description')}
      action={{
        text: t('cta.button'),
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

