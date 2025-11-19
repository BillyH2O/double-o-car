"use client";

import { Suspense, useState, useEffect, startTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import LocationModal from "@/components/ui/LocationModal";
import DatePickerModal from "@/components/ui/DatePickerModal";

interface SearchFormProps {
  onSearch?: () => void;
  redirectTo?: string; // Par défaut redirige vers /vehicules
  className?: string;
}

function SearchFormContent({ onSearch, redirectTo = '/vehicules', className }: SearchFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Initialiser depuis l'URL si disponible
  const urlStartDate = searchParams?.get('startDate') || '';
  const urlEndDate = searchParams?.get('endDate') || '';
  const urlPickupLocation = searchParams?.get('pickupLocation') || 'Aéroport de Marrakech';
  const urlReturnLocation = searchParams?.get('returnLocation') || 'Aéroport de Marrakech';
  
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  
  const [pickupLocation, setPickupLocation] = useState(urlPickupLocation);
  const [returnLocation, setReturnLocation] = useState(urlReturnLocation);
  
  const [startDate, setStartDate] = useState(urlStartDate);
  const [endDate, setEndDate] = useState(urlEndDate);
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("10:00");

  // Mettre à jour les valeurs quand l'URL change
  useEffect(() => {
    if (searchParams) {
      const urlStart = searchParams.get('startDate') || '';
      const urlEnd = searchParams.get('endDate') || '';
      const urlPickup = searchParams.get('pickupLocation') || 'Aéroport de Marrakech';
      const urlReturn = searchParams.get('returnLocation') || 'Aéroport de Marrakech';
      
      startTransition(() => {
      setStartDate(urlStart);
        setEndDate(urlEnd);
        setPickupLocation(urlPickup);
        setReturnLocation(urlReturn);
      })
    }
  }, [searchParams]);

  const handleSearch = () => {
    // Construire l'URL avec les paramètres de recherche
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    if (pickupLocation) params.append('pickupLocation', pickupLocation);
    if (returnLocation) params.append('returnLocation', returnLocation);
    
    const queryString = params.toString();
    router.push(`${redirectTo}${queryString ? `?${queryString}` : ''}`);
    if (onSearch) onSearch();
  };

  // Formater les dates pour l'affichage
  const formatDate = (dateString: string) => {
    if (!dateString) return "Sélectionner";
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
  };

  const displayDates = startDate && endDate 
    ? `${formatDate(startDate)} - ${formatDate(endDate)}`
    : "Sélectionner les dates";

  return (
    <>
      <div className={`bg-white rounded-2xl shadow-lg overflow-hidden mx-auto w-full ${className || ''}`}>
        <div className="bg-white p-4 md:p-6">
          <div className="flex flex-col gap-4">
            {/* Pickup Location */}
            <div 
              className="w-full cursor-pointer"
              onClick={() => setIsLocationModalOpen(true)}
            >
              <div className="flex items-center gap-3">
                <div className="shrink-0 w-10 h-10 border border-[#0000001A] rounded-full flex items-center justify-center">
                  <Image src="/position.png" alt="Location" width={16} height={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <label className="block text-xs text-gray-400 mb-1 font-montserrat font-bold">
                    Lieu de départ
                  </label>
                  <div className="text-black text-sm font-montserrat font-medium">
                    {pickupLocation}
                  </div>
                </div>
              </div>
            </div>

            {/* Date Selection */}
            <div 
              className="w-full cursor-pointer"
              onClick={() => setIsDateModalOpen(true)}
            >
              <div className="flex items-center gap-3">
                <div className="shrink-0 w-10 h-10 border border-[#0000001A] rounded-full flex items-center justify-center">
                  <Image src="/calendar.png" alt="Calendar" width={16} height={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <label className="block text-xs text-gray-400 mb-1 font-montserrat font-bold">
                    Dates
                  </label>
                  <div className="text-black text-sm font-montserrat font-medium">
                    {displayDates}
                  </div>
                </div>
              </div>
            </div>

            {/* Search Button */}
            <div className="w-full">
              <button
                onClick={handleSearch}
                className="w-full bg-[#003CF0] hover:bg-[#0034D0] text-white py-3 px-6 rounded-xl transition-colors font-montserrat font-semibold text-sm whitespace-nowrap h-10 flex items-center justify-center"
              >
                Rechercher
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Location Modal */}
      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        pickupLocation={pickupLocation}
        returnLocation={returnLocation}
        onPickupChange={setPickupLocation}
        onReturnChange={setReturnLocation}
        onConfirm={() => {}}
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
    </>
  );
}

export default function SearchForm(props: SearchFormProps) {
  return (
    <Suspense fallback={
      <div className={`bg-white rounded-2xl shadow-lg overflow-hidden mx-auto w-full ${props.className || ''}`}>
        <div className="bg-white p-4 md:p-6">
          <div className="flex flex-col gap-4">
            <div className="text-center text-gray-400 py-8">Chargement...</div>
          </div>
        </div>
      </div>
    }>
      <SearchFormContent {...props} />
    </Suspense>
  );
}

