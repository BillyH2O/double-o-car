"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LocationModal from "@/components/ui/LocationModal";
import DatePickerModal from "@/components/ui/DatePickerModal";
import { useTranslations, useLocale } from "next-intl";

interface BookingFormProps {
  onSearch: () => void;
}

export default function BookingForm({ onSearch }: BookingFormProps) {
  const t = useTranslations("booking");
  const locale = useLocale();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("same");
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  
  const [pickupLocation, setPickupLocation] = useState(t("defaultLocation"));
  const [returnLocation, setReturnLocation] = useState(t("defaultLocation"));
  
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("10:00");

  const handleSearch = () => {
    // Construire l'URL avec les paramètres de recherche
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    if (pickupLocation) params.append('pickupLocation', pickupLocation);
    if (returnLocation) params.append('returnLocation', returnLocation);
    
    const queryString = params.toString();
    router.push(`/vehicules${queryString ? `?${queryString}` : ''}`);
    onSearch();
  };

  // Formater les dates pour l'affichage
  const formatDate = (dateString: string) => {
    if (!dateString) return t("select");
    const date = new Date(dateString);
    return date.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <div className="bg-gray-50 rounded-3xl shadow-2xl overflow-hidden mx-auto w-full">
      {/* Tabs */}
      <div className="flex rounded-t-3xl overflow-hidden">
        <button
          onClick={() => setActiveTab("same")}
          className={`flex-1 py-4 sm:py-5 md:py-6 px-3 sm:px-6 md:px-8 font-montserrat font-medium text-sm sm:text-base md:text-lg transition-colors relative ${activeTab === "same" ? "bg-white text-black" : "bg-black text-white"
            }`}
        >
          {t("sameReturnLocation")}
          {activeTab === "same" && (
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-[#003CF099] rounded-full"></div>
          )}
        </button>
        <button
          onClick={() => setActiveTab("different")}
          className={`flex-1 py-4 sm:py-5 md:py-6 px-3 sm:px-6 md:px-8 font-montserrat font-medium text-sm sm:text-base md:text-lg transition-colors relative ${activeTab === "different" ? "bg-white text-black" : "bg-black text-white"
            }`}
        >
          {t("differentReturnLocation")}
          {activeTab === "different" && (
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-[#003CF099] rounded-full"></div>
          )}
        </button>
      </div>

      {/* Form Content */}
      <div className="bg-white p-6 sm:p-8 md:p-16 space-y-2">
        {/* Pickup Location */}
        <div 
          className="relative cursor-pointer"
          onClick={() => setIsLocationModalOpen(true)}
        >
          <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
            <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 border border-[#0000001A] rounded-full flex items-center justify-center">
              <Image src="/position.png" alt="Location" width={20} height={20} className="sm:w-6 sm:h-6 md:w-8 md:h-8" />
            </div>
            <div className="flex-1 ml-4 sm:ml-8 md:ml-12">
              <label className="block text-xs sm:text-sm md:text-base text-gray-400 mb-1 md:mb-2 font-montserrat font-bold font-weight-700">
                {t("pickupLocationLabel")}
              </label>
              <div className="text-black text-base sm:text-lg md:text-xl font-montserrat font-medium font-weight-500">
                {pickupLocation}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
          <div className="flex-1 border-t border-[#0000000D]"></div>
          <button 
            onClick={() => {
              const temp = pickupLocation;
              setPickupLocation(returnLocation);
              setReturnLocation(temp);
            }}
            className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 border border-[#0000001A] rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <Image src="/arrow.svg" alt="Swap" width={28} height={20} className="sm:w-[33px] sm:h-[23px] md:w-[40px] md:h-[28px]" />
          </button>
        </div>

        {/* Return Location */}
        <div 
          className="relative mb-8 sm:mb-10 md:mb-12 cursor-pointer"
          onClick={() => setIsLocationModalOpen(true)}
        >
          <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
            <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 border border-[#0000001A] rounded-full flex items-center justify-center">
              <Image src="/position.png" alt="Location" width={20} height={20} className="sm:w-6 sm:h-6 md:w-8 md:h-8" />
            </div>
            <div className="flex-1 ml-4 sm:ml-8 md:ml-12">
              <label className="block text-xs sm:text-sm md:text-base text-gray-400 mb-1 md:mb-2 font-montserrat font-bold font-weight-700">
                {t("returnLocationLabel")}
              </label>
              <div className="text-black text-base sm:text-lg md:text-xl font-montserrat font-medium font-weight-500">
                {returnLocation}
              </div>
            </div>
          </div>
        </div>

        <div className="border border-[#0000000D]"></div>

        {/* Date Selection */}
        <div 
          className="flex items-center gap-4 sm:gap-8 md:gap-10 mt-6 sm:mt-8 md:mt-10 mb-8 sm:mb-10 md:mb-12 cursor-pointer"
          onClick={() => setIsDateModalOpen(true)}
        >
          <div className="flex-1">
            <label className="block text-xs sm:text-sm md:text-base text-[#0000004D] mb-1 sm:mb-2 md:mb-3 font-montserrat font-bold font-weight-700">
              {t("from")}
            </label>
            <div className="text-black text-sm sm:text-lg md:text-xl font-montserrat font-medium font-weight-500">
              {startDate ? formatDate(startDate) : t("select")}
            </div>
            <div className="text-black text-sm sm:text-lg md:text-xl font-montserrat font-medium font-weight-500">
              {startTime ? `${startTime}` : ""}
            </div>
          </div>

          <div className="shrink-0">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 border border-[#0000001A] rounded-full flex items-center justify-center">
              <Image src="/calendar.png" alt="Calendar" width={20} height={20} className="sm:w-6 sm:h-6 md:w-8 md:h-8" />
            </div>
          </div>

          <div className="flex-1 flex flex-col items-end">
            <label className="block text-xs sm:text-sm md:text-base text-[#0000004D] mb-1 sm:mb-2 md:mb-3 font-montserrat font-bold font-weight-700">
              {t("to")}
            </label>
            <div className="text-black text-sm sm:text-lg md:text-xl font-montserrat font-medium font-weight-500 text-right">
              {endDate ? formatDate(endDate) : t("select")}
            </div>
            <div className="text-black text-sm sm:text-lg md:text-xl font-montserrat font-medium font-weight-500">
              {endTime ? `${endTime}` : ""}
            </div>
          </div>
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="w-full bg-[#003CF0] hover:bg-[#0034D0] text-white py-4 sm:py-5 md:py-6 rounded-[30px] transition-colors font-montserrat font-semibold text-base sm:text-lg md:text-xl"
        >
          {t("searchCar")}
        </button>
      </div>

      {/* Location Modal */}
      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        pickupLocation={pickupLocation}
        returnLocation={returnLocation}
        onPickupChange={setPickupLocation}
        onReturnChange={setReturnLocation}
        onConfirm={() => {
          if (activeTab === "same") {
            setReturnLocation(pickupLocation);
          }
        }}
      />

      {/* Date Picker Modal */}
      <DatePickerModal
        isOpen={isDateModalOpen}
        onClose={() => setIsDateModalOpen(false)}
        startDate={startDate}
        endDate={endDate}
        startTime={startTime}
        endTime={endTime}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onStartTimeChange={setStartTime}
        onEndTimeChange={setEndTime}
        onConfirm={() => {}}
      />
    </div>
  );
}
