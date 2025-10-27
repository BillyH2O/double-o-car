import Image from "next/image";
import { useState } from "react";
import { cars } from "@/data/cars";
import { Car } from "@/types";
import ReservationDetails from "./ReservationDetails";

interface CarListProps {
  onBack: () => void;
}

export default function CarList({ onBack }: CarListProps) {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  if (selectedCar) {
    return <ReservationDetails car={selectedCar} onBack={() => setSelectedCar(null)} />;
  }

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

      {/* Results Section */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          {/* Back button and location info */}
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
              <h1 className="text-white text-lg sm:text-xl md:text-2xl font-montserrat font-semibold mb-1 sm:mb-2">Aéroport de Marrakech</h1>
              <p className="text-white/60 font-montserrat text-sm sm:text-base">12 Dec 2025 - 18 Dec 2025</p>
            </div>
          </div>

          {/* Car List */}
          <div className="space-y-4 sm:space-y-6">
            {cars.map((car) => (
              <div
                key={car.id}
                className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
                onClick={() => setSelectedCar(car)}
              >
                <div className="flex flex-col sm:flex-row justify-between items-start mb-4 sm:mb-6">
                  <div className="flex sm:flex-col gap-4 sm:gap-8 md:gap-16 items-center sm:items-start mb-4 sm:mb-0">
                    <Image
                      src={car.logo}
                      alt={car.brand}
                      width={50}
                      height={50}
                      className={`w-10 h-10 sm:w-12 sm:h-12 ${car.brand === "Dacia" ? "brightness-0" : ""}`}
                    />
                    <h3 className="font-montserrat font-normal text-black text-base sm:text-lg md:text-xl">
                      {car.brand} <span className="font-semibold">{car.model}</span>
                    </h3>
                  </div>
                  <div className="flex items-start w-full sm:w-auto justify-center">
                    <Image src={car.image} alt={`${car.brand} ${car.model}`} width={380} height={300} className="object-contain w-full sm:w-60 md:w-80 max-w-xs sm:max-w-none" />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex gap-2 sm:gap-3 text-xs sm:text-sm flex-wrap">
                    <div className="flex items-center gap-1.5 sm:gap-2 bg-[#D9D9D980] rounded-[20px] px-3 sm:px-4 py-1.5 sm:py-2">
                      <Image src="/calendar2.png" alt="Calendar" width={20} height={20} className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="text-[#000000] font-montserrat">{car.year}</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2 bg-[#D9D9D980] rounded-[20px] px-3 sm:px-4 py-1.5 sm:py-2">
                      <Image src="/pod.png" alt="Transmission" width={20} height={20} className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="text-[#000000] font-montserrat">{car.transmission}</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2 bg-[#D9D9D980] rounded-[20px] px-3 sm:px-4 py-1.5 sm:py-2">
                      <Image src="/essence.png" alt="Fuel" width={20} height={20} className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="text-[#000000] font-montserrat">{car.fuel}</span>
                    </div>
                  </div>
                  <div className="bg-[#003CF075] px-4 sm:px-6 py-1.5 sm:py-2 rounded-[20px]">
                    <span className="text-black font-montserrat font-semibold font-weight-600 text-base sm:text-lg">{car.pricePerDay}€</span>
                    <span className="text-black font-montserrat font-regular font-weight-400 text-xs sm:text-sm">/Jour</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-8 sm:py-12 px-4 sm:px-6 border-t border-gray-800 mt-12 sm:mt-20">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-center mb-6 sm:mb-8">
            <Image src="/logo.png" alt="Double-O Car" width={100} height={50} className="object-contain w-20 h-10 sm:w-[100px] sm:h-[50px]" />
          </div>
          <nav className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 font-montserrat font-light font-weight-300 text-[#FFFFFF] text-xs sm:text-sm">
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
