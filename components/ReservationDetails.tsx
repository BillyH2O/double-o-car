import Image from "next/image";
import { Car } from "@/types";

interface ReservationDetailsProps {
  car: Car;
  onBack: () => void;
}

export default function ReservationDetails({ car, onBack }: ReservationDetailsProps) {
  const numberOfDays = 7;
  const totalPrice = car.pricePerDay * numberOfDays;

  return (
    <div className="min-h-screen bg-linear-to-b from-[#001141] via-[#001a5c] to-black">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
          <button className="text-white">
            <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex-1 flex justify-center">
            <Image src="/logo.png" alt="Double-O Car" width={120} height={60} className="object-contain w-20 h-10 sm:w-[120px] sm:h-[60px]" />
          </div>
          <div className="text-white">
            <Image src="/globe.svg" alt="Language" width={24} height={24} className="invert w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-2xl">
          {/* Back button and title */}
          <div className="flex items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
            <button
              onClick={onBack}
              className="w-12 h-12 sm:w-14 sm:h-14 border-2 border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors shrink-0"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex-1">
              <h1 className="text-white text-xl sm:text-2xl md:text-3xl font-montserrat font-semibold mb-1 sm:mb-2">Détails de la réservation</h1>
              <p className="text-white/60 font-montserrat text-sm sm:text-base">12 Dec 2025 - 18 Dec 2025</p>
            </div>
          </div>

          {/* Car Image */}
          <div className="mb-6 sm:mb-8 flex justify-center">
            <div className="relative w-full max-w-lg">
              <Image
                src={car.image}
                alt={`${car.brand} ${car.model}`}
                width={600}
                height={400}
                className="object-contain w-full"
              />
            </div>
          </div>

          {/* Car Info Card */}
          <div className="bg-[#1a2847] rounded-2xl sm:rounded-3xl p-4 sm:p-6 mb-4 sm:mb-6">
            <h2 className="text-white font-montserrat text-lg sm:text-xl mb-3 sm:mb-4">
              {car.brand} <span className="font-bold">{car.model}</span>
            </h2>
            <p className="text-white/80 font-montserrat text-xs sm:text-sm">
              {car.year} | {car.transmission} | {car.fuel}
            </p>
          </div>

          {/* Location Card */}
          <div className="bg-[#1a2847] rounded-2xl sm:rounded-3xl p-4 sm:p-6 mb-4 sm:mb-6">
            <h3 className="text-white font-montserrat font-semibold text-base sm:text-lg mb-3 sm:mb-4">
              Lieu de départ et retour
            </h3>
            <div className="space-y-2.5 sm:space-y-3">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <Image src="/position.png" alt="Location" width={24} height={24} className="opacity-80 w-5 h-5 sm:w-6 sm:h-6" />
                <span className="text-white/80 font-montserrat text-sm sm:text-base">Aéroport de Marrakech</span>
              </div>
              <div className="flex items-center gap-2.5 sm:gap-3">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span className="text-white/80 font-montserrat text-sm sm:text-base">Aéroport de Tanger</span>
              </div>
            </div>
          </div>

          {/* Price Details Card */}
          <div className="bg-[#1a2847] rounded-2xl sm:rounded-3xl p-4 sm:p-6 mb-6 sm:mb-8">
            <h3 className="text-white font-montserrat font-semibold text-base sm:text-lg mb-3 sm:mb-4">
              Prix de la location
            </h3>
            <div className="space-y-2.5 sm:space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-white/80 font-montserrat text-sm sm:text-base">Prix de la location</span>
                <span className="text-white font-montserrat font-bold text-sm sm:text-base">{car.pricePerDay}€ / Jour</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/80 font-montserrat text-sm sm:text-base">Nombre de jours</span>
                <span className="text-white font-montserrat font-bold text-sm sm:text-base">{numberOfDays} jours</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/80 font-montserrat text-sm sm:text-base">Kilométrage</span>
                <span className="text-white font-montserrat font-bold text-sm sm:text-base">Illimité</span>
              </div>
              <div className="border-t border-white/20 pt-2.5 sm:pt-3 mt-2.5 sm:mt-3">
                <div className="flex justify-between items-center">
                  <span className="text-white font-montserrat font-semibold text-base sm:text-lg">Prix total</span>
                  <span className="text-white font-montserrat font-bold text-lg sm:text-xl">{totalPrice} €</span>
                </div>
              </div>
            </div>
          </div>

          {/* Validate Button */}
          <button className="w-full bg-[#003CF0] text-white font-montserrat font-semibold text-base sm:text-lg py-3.5 sm:py-4 rounded-full hover:bg-[#0031c0] transition-colors">
            Valider la réservation
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-8 sm:py-12 px-4 sm:px-6 border-t border-gray-800 mt-12 sm:mt-20">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-center mb-6 sm:mb-8">
            <Image src="/logo.png" alt="Double-O Car" width={100} height={50} className="object-contain w-20 h-10 sm:w-[100px] sm:h-[50px]" />
          </div>
          <nav className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 font-montserrat font-light text-[#FFFFFF] text-xs sm:text-sm">
            <a href="#" className="hover:text-white transition-colors">Mentions légales</a>
            <a href="#" className="hover:text-white transition-colors">À propos</a>
            <a href="#" className="hover:text-white transition-colors">Nous contacter</a>
            <a href="#" className="hover:text-white transition-colors">Conditions de location</a>
          </nav>
          <div className="text-center text-[#D9D9D980] text-xs sm:text-sm mt-6 sm:mt-8">
            Développé par <span className="text-[#003CF0]">Blue</span>Studio ©
          </div>
        </div>
      </footer>
    </div>
  );
}
