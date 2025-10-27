"use client";

import Image from "next/image";
import { useState } from "react";

interface BookingFormProps {
  onSearch: () => void;
}

export default function BookingForm({ onSearch }: BookingFormProps) {
  const [activeTab, setActiveTab] = useState("same");

  return (
    <div className="bg-gray-50 rounded-3xl shadow-2xl overflow-hidden max-w-3xl mx-auto">
      {/* Tabs */}
      <div className="flex rounded-t-3xl overflow-hidden">
        <button
          onClick={() => setActiveTab("same")}
          className={`flex-1 py-4 sm:py-5 px-3 sm:px-6 font-montserrat font-medium text-sm sm:text-base transition-colors relative ${activeTab === "same" ? "bg-white text-black" : "bg-black text-white"
            }`}
        >
          Lieu de retour identique
          {activeTab === "same" && (
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-[#003CF099] rounded-full"></div>
          )}
        </button>
        <button
          onClick={() => setActiveTab("different")}
          className={`flex-1 py-4 sm:py-5 px-3 sm:px-6 font-montserrat font-medium text-sm sm:text-base transition-colors relative ${activeTab === "different" ? "bg-white text-black" : "bg-black text-white"
            }`}
        >
          Lieu de retour différent
          {activeTab === "different" && (
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-[#003CF099] rounded-full"></div>
          )}
        </button>
      </div>

      {/* Form Content */}
      <div className="bg-white p-6 sm:p-8 md:p-12 space-y-2">
        {/* Pickup Location */}
        <div className="relative">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 border border-[#0000001A] rounded-full flex items-center justify-center">
              <Image src="/position.png" alt="Location" width={20} height={20} className="sm:w-6 sm:h-6" />
            </div>
            <div className="flex-1 ml-4 sm:ml-8">
              <label className="block text-xs sm:text-sm text-gray-400 mb-1 font-montserrat font-bold font-weight-700">
                Lieu de départ
              </label>
              <input
                type="text"
                defaultValue="Aéroport de Marrakech"
                className="w-full outline-none text-black text-base sm:text-lg font-montserrat font-medium font-weight-500 bg-transparent"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex-1 border-t border-[#0000000D]"></div>
          <button className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 border border-[#0000001A] rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors">
            <Image src="/arrow.svg" alt="Swap" width={28} height={20} className="sm:w-[33px] sm:h-[23px]" />
          </button>
        </div>

        {/* Return Location */}
        <div className="relative mb-8 sm:mb-10">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 border border-[#0000001A] rounded-full flex items-center justify-center">
              <Image src="/position.png" alt="Location" width={20} height={20} className="sm:w-6 sm:h-6" />
            </div>
            <div className="flex-1 ml-4 sm:ml-8">
              <label className="block text-xs sm:text-sm text-gray-400 mb-1 font-montserrat font-bold font-weight-700">
                Lieu de retour
              </label>
              <input
                type="text"
                defaultValue="Aéroport de Tanger"
                className="w-full outline-none text-black text-base sm:text-lg font-montserrat font-medium font-weight-500 bg-transparent"
              />
            </div>
          </div>
        </div>

        <div className="border border-[#0000000D]"></div>

        {/* Date Selection */}
        <div className="flex items-center gap-4 sm:gap-8 mt-6 sm:mt-8 mb-8 sm:mb-10">
          <div className="flex-1">
            <label className="block text-xs sm:text-sm text-[#0000004D] mb-1 sm:mb-2 font-montserrat font-bold font-weight-700">
              Du
            </label>
            <div className="text-black text-sm sm:text-lg font-montserrat font-medium font-weight-500">12 Decembre 2025</div>
            <div className="text-black text-sm sm:text-lg font-montserrat font-medium font-weight-500">10h00</div>
          </div>

          <div className="shrink-0">
            <div className="w-12 h-12 sm:w-14 sm:h-14 border border-[#0000001A] rounded-full flex items-center justify-center">
              <Image src="/calendar.png" alt="Calendar" width={20} height={20} className="sm:w-6 sm:h-6" />
            </div>
          </div>

          <div className="flex-1 flex flex-col items-end">
            <label className="block text-xs sm:text-sm text-[#0000004D] mb-1 sm:mb-2 font-montserrat font-bold font-weight-700">
              Au
            </label>
            <div className="text-black text-sm sm:text-lg font-montserrat font-medium font-weight-500 text-right">18 Décembre 2025</div>
            <div className="text-black text-sm sm:text-lg font-montserrat font-medium font-weight-500">10h00</div>
          </div>
        </div>

        {/* Search Button */}
        <button
          onClick={onSearch}
          className="w-full bg-[#003CF0] hover:bg-[#0034D0] text-white py-4 sm:py-5 rounded-[30px] transition-colors font-montserrat font-semibold text-base sm:text-lg"
        >
          Rechercher une voiture
        </button>
      </div>
    </div>
  );
}
