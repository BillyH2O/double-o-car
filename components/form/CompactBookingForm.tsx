"use client";

import { Suspense, useState, useEffect, startTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import LocationModal from "@/components/ui/LocationModal";
import DatePickerModal from "@/components/ui/DatePickerModal";

function CompactBookingFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  
  // États pour les valeurs du formulaire
  const [pickupLocation, setPickupLocation] = useState('Aéroport de Marrakech');
  const [returnLocation, setReturnLocation] = useState('Aéroport de Marrakech');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("10:00");

  // Mettre à jour les valeurs depuis l'URL (seulement si l'URL a des paramètres)
  useEffect(() => {
    if (searchParams) {
      const urlStart = searchParams.get('startDate');
      const urlEnd = searchParams.get('endDate');
      const urlPickup = searchParams.get('pickupLocation');
      const urlReturn = searchParams.get('returnLocation');
      
      // Ne mettre à jour que si l'URL contient des valeurs (pour éviter d'écraser les valeurs saisies)
      // Utiliser startTransition pour éviter l'appel synchrone de setState dans l'effet
      startTransition(() => {
      if (urlStart) setStartDate(urlStart);
      if (urlEnd) setEndDate(urlEnd);
      if (urlPickup) setPickupLocation(urlPickup);
      if (urlReturn) setReturnLocation(urlReturn);
      });
    }
  }, [searchParams]);

  const handleSearch = () => {
    // Vérifier que les dates sont bien définies
    if (!startDate || !endDate) {
      console.warn('⚠️ Dates manquantes:', { startDate, endDate });
      alert('Veuillez sélectionner des dates de location');
      return;
    }
    
    // Construire l'URL avec les paramètres de recherche
    const params = new URLSearchParams();
    params.append('startDate', startDate);
    params.append('endDate', endDate);
    if (pickupLocation) params.append('pickupLocation', pickupLocation);
    if (returnLocation) params.append('returnLocation', returnLocation);
    
    const queryString = params.toString();
    const url = `/vehicules?${queryString}`;
    console.log('🔍 Navigation vers:', url, { startDate, endDate, pickupLocation, returnLocation });
    // Ne pas appeler onSearch() car cela déclenche CarList qui redirige sans paramètres
    router.push(url);
  };

  // Formater les dates pour l'affichage
  const formatDate = (dateString: string) => {
    if (!dateString || dateString.trim() === '') return null;
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return null;
      return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
    } catch {
      return null;
    }
  };

  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);
  
  const displayDates = formattedStartDate && formattedEndDate
    ? `${formattedStartDate} - ${formattedEndDate}`
    : "Sélectionner les dates";

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden mx-auto w-full">
        {/* Form Content - Horizontal on desktop, vertical on mobile */}
        <div className="bg-white p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-4">
            {/* Pickup Location */}
            <div 
              className="flex-1 w-full md:w-auto md:min-w-[200px] cursor-pointer"
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
              className="flex-1 w-full md:w-auto md:min-w-[180px] cursor-pointer"
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
            <div className="w-full md:w-auto md:shrink-0">
              <button
                onClick={handleSearch}
                className="w-full md:w-auto md:px-6 bg-[#003CF0] hover:bg-[#0034D0] text-white py-3 px-6 rounded-xl transition-colors font-montserrat font-semibold text-sm whitespace-nowrap h-10 flex items-center justify-center"
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

export default function CompactBookingForm() {
  return (
    <Suspense fallback={
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden mx-auto w-full">
        <div className="bg-white p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-4">
            <div className="text-center text-gray-400 py-8">Chargement...</div>
          </div>
        </div>
      </div>
    }>
      <CompactBookingFormContent />
    </Suspense>
  );
}

