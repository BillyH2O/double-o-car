"use client";

import Image from "next/image";

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  pickupLocation: string;
  returnLocation: string;
  onPickupChange: (location: string) => void;
  onReturnChange: (location: string) => void;
  onConfirm: () => void;
}

export default function LocationModal({
  isOpen,
  onClose,
  pickupLocation,
  returnLocation,
  onPickupChange,
  onReturnChange,
  onConfirm,
}: LocationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-xl font-montserrat font-bold text-black mb-6">Sélectionner les lieux</h2>

        {/* Pickup Location */}
        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-2 font-montserrat font-semibold">
            Lieu de récupération
          </label>
          <div className="flex items-center gap-3 border border-gray-200 rounded-lg p-3 focus-within:border-[#003CF0] transition-colors">
            <Image src="/position.png" alt="Location" width={20} height={20} />
            <input
              type="text"
              value={pickupLocation}
              onChange={(e) => onPickupChange(e.target.value)}
              className="flex-1 outline-none text-black font-montserrat"
              placeholder="Entrez le lieu de récupération"
            />
          </div>
        </div>

        {/* Return Location */}
        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-2 font-montserrat font-semibold">
            Lieu de restitution
          </label>
          <div className="flex items-center gap-3 border border-gray-200 rounded-lg p-3 focus-within:border-[#003CF0] transition-colors">
            <Image src="/position.png" alt="Location" width={20} height={20} />
            <input
              type="text"
              value={returnLocation}
              onChange={(e) => onReturnChange(e.target.value)}
              className="flex-1 outline-none text-black font-montserrat"
              placeholder="Entrez le lieu de restitution"
            />
          </div>
          <button
            onClick={() => onReturnChange(pickupLocation)}
            className="mt-2 text-sm text-[#003CF0] hover:text-[#0034D0] font-montserrat font-medium transition-colors"
          >
            Utiliser le même lieu
          </button>
        </div>

        {/* Confirm Button */}
        <button
          onClick={() => {
            onConfirm();
            onClose();
          }}
          className="w-full bg-[#003CF0] hover:bg-[#0034D0] text-white py-3 rounded-lg transition-colors font-montserrat font-semibold"
        >
          Confirmer
        </button>
      </div>
    </div>
  );
}

