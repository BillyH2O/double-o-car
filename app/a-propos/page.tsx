"use client"

import Image from "next/image"
import Footer from "@/components/layout/footer"
import { Navbar } from "@/components/layout/navbar"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-[#001141] via-[#001a5c] to-black">
      <Navbar />
      
      {/* Hero Image */}
      <section className="relative w-full pt-24 sm:pt-32">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14">
          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/image-femme-voiture.jpg"
              alt="Notre équipe"
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
            Notre Histoire
          </h2>
          <div className="space-y-4 text-lg sm:text-xl text-gray-300 font-montserrat leading-relaxed">
            <p>
              Double-O Car est née d&apos;une passion pour l&apos;automobile et d&apos;un désir de rendre la location de véhicules accessible à tous. Fondée en 2020, notre entreprise s&apos;est rapidement imposée comme un acteur de référence dans le secteur de la location automobile.
            </p>
            <p>
              Nous avons commencé avec une vision simple : offrir une expérience de location exceptionnelle, où chaque client se sent valorisé et où chaque véhicule est soigneusement sélectionné pour répondre aux besoins les plus exigeants.
            </p>
            <p>
              Aujourd&apos;hui, nous sommes fiers de proposer une flotte diversifiée de véhicules modernes, allant des citadines économiques aux berlines de luxe, en passant par les SUV spacieux. Notre engagement envers l&apos;excellence et la satisfaction client reste au cœur de tout ce que nous faisons.
            </p>
          </div>
        </div>
      </section>

      {/* Notre Mission */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14 bg-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-montserrat text-white mb-6 text-center">
            Notre Mission
          </h2>
          <div className="space-y-4 text-lg sm:text-xl text-gray-300 font-montserrat leading-relaxed">
            <p>
              Chez Double-O Car, notre mission est de révolutionner l&apos;expérience de location automobile en offrant un service personnalisé, transparent et accessible. Nous croyons que chaque voyage mérite de commencer par une expérience exceptionnelle.
            </p>
            <p>
              Nous nous engageons à :
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Fournir des véhicules de qualité supérieure, régulièrement entretenus et vérifiés</li>
              <li>Offrir des tarifs transparents et compétitifs sans frais cachés</li>
              <li>Proposer un service client réactif et disponible 7j/7</li>
              <li>Respecter l&apos;environnement en favorisant des véhicules économes en carburant</li>
              <li>Simplifier le processus de réservation pour une expérience fluide</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Notre Équipe */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-montserrat text-white mb-12 text-center">
            Notre Équipe
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="w-20 h-20 bg-[#003CF0] rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-white text-2xl font-bold font-montserrat">B</span>
              </div>
              <h3 className="text-xl font-bold font-montserrat text-white text-center mb-2">
                Brahim
              </h3>
              <p className="text-gray-300 text-center font-montserrat mb-3">
                Cofondateur
              </p>
              <p className="text-sm text-gray-400 text-center font-montserrat">
                Cofondateur de Double-O Car, Brahim développe ce business depuis 1 an avec passion et détermination pour offrir la meilleure expérience de location.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="w-20 h-20 bg-[#003CF0] rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-white text-2xl font-bold font-montserrat">M</span>
              </div>
              <h3 className="text-xl font-bold font-montserrat text-white text-center mb-2">
                Mohamed
              </h3>
              <p className="text-gray-300 text-center font-montserrat mb-3">
                Cofondateur
              </p>
              <p className="text-sm text-gray-400 text-center font-montserrat">
                Cofondateur de Double-O Car, Mohamed développe ce business depuis 1 an avec passion et détermination pour offrir la meilleure expérience de location.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Nos Valeurs */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14 bg-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-montserrat text-white mb-12 text-center">
            Nos Valeurs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold font-montserrat text-white mb-3">
                Excellence
              </h3>
              <p className="text-gray-300 font-montserrat">
                Nous visons l&apos;excellence dans chaque aspect de notre service, de la sélection des véhicules à l&apos;accueil de nos clients.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold font-montserrat text-white mb-3">
                Transparence
              </h3>
              <p className="text-gray-300 font-montserrat">
                Pas de frais cachés, pas de surprises. Nous croyons en une communication claire et honnête avec nos clients.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold font-montserrat text-white mb-3">
                Innovation
              </h3>
              <p className="text-gray-300 font-montserrat">
                Nous adoptons les dernières technologies pour améliorer constamment l&apos;expérience de nos clients.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold font-montserrat text-white mb-3">
                Durabilité
              </h3>
              <p className="text-gray-300 font-montserrat">
                Nous nous engageons pour un avenir plus vert en proposant des véhicules économes et en favorisant des pratiques durables.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

