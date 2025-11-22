"use client"

import Image from "next/image"
import Footer from "@/components/layout/footer"
import { Navbar } from "@/components/layout/navbar"
import { useTranslations } from "next-intl"

export default function AboutPage() {
  const t = useTranslations("aboutPage")
  
  return (
    <div className="min-h-screen bg-linear-to-b from-[#001141] via-[#001a5c] to-black">
      <Navbar />
      
      {/* Hero Image */}
      <section className="relative w-full pt-24 sm:pt-32">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14">
          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/image-femme-voiture.jpg"
              alt={t("heroAlt")}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Notre Histoire */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-montserrat text-white mb-6 text-center">
            {t("section1.title")}
          </h2>
          <div className="space-y-4 text-lg sm:text-xl text-gray-300 font-montserrat leading-relaxed">
            <p>
              {t("section1.paragraph1")}
            </p>
            <p>
              {t("section1.paragraph2")}
            </p>
            <p>
              {t("section1.paragraph3")}
            </p>
          </div>
        </div>
      </section>

      {/* Notre Mission */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14 bg-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-montserrat text-white mb-6 text-center">
            {t("section2.title")}
          </h2>
          <div className="space-y-4 text-lg sm:text-xl text-gray-300 font-montserrat leading-relaxed">
            <p>
              {t("section2.paragraph1")}
            </p>
            <p>
              {t("section2.paragraph2")}
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              {t.raw("section2.items").map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Notre Équipe */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-montserrat text-white mb-12 text-center">
            {t("section3.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="w-20 h-20 bg-[#003CF0] rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-white text-2xl font-bold font-montserrat">B</span>
              </div>
              <h3 className="text-xl font-bold font-montserrat text-white text-center mb-2">
                {t("section3.brahim.name")}
              </h3>
              <p className="text-gray-300 text-center font-montserrat mb-3">
                {t("section3.cofounder")}
              </p>
              <p className="text-sm text-gray-400 text-center font-montserrat">
                {t("section3.brahim.description")}
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="w-20 h-20 bg-[#003CF0] rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-white text-2xl font-bold font-montserrat">M</span>
              </div>
              <h3 className="text-xl font-bold font-montserrat text-white text-center mb-2">
                {t("section3.mohamed.name")}
              </h3>
              <p className="text-gray-300 text-center font-montserrat mb-3">
                {t("section3.cofounder")}
              </p>
              <p className="text-sm text-gray-400 text-center font-montserrat">
                {t("section3.mohamed.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Nos Valeurs */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14 bg-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-montserrat text-white mb-12 text-center">
            {t("section4.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold font-montserrat text-white mb-3">
                {t("section4.excellence.title")}
              </h3>
              <p className="text-gray-300 font-montserrat">
                {t("section4.excellence.text")}
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold font-montserrat text-white mb-3">
                {t("section4.transparency.title")}
              </h3>
              <p className="text-gray-300 font-montserrat">
                {t("section4.transparency.text")}
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold font-montserrat text-white mb-3">
                {t("section4.innovation.title")}
              </h3>
              <p className="text-gray-300 font-montserrat">
                {t("section4.innovation.text")}
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold font-montserrat text-white mb-3">
                {t("section4.sustainability.title")}
              </h3>
              <p className="text-gray-300 font-montserrat">
                {t("section4.sustainability.text")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

