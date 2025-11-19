"use client"

import Image from "next/image"

interface SearchCriteriaProps {
  pickupLocation?: string
  returnLocation?: string
  startDate?: string
  endDate?: string
}

export default function SearchCriteria({ pickupLocation, returnLocation, startDate, endDate }: SearchCriteriaProps) {
  // Ne pas afficher si aucun critère n'est défini (en excluant les valeurs par défaut)
  const hasValidCriteria = (startDate && endDate) || (pickupLocation && pickupLocation !== 'Aéroport de Marrakech')
  
  if (!hasValidCriteria) {
    return null
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6">
      <h2 className="text-white text-lg font-montserrat font-semibold mb-3">Critères de recherche</h2>
      <div className="space-y-2 text-white/80 font-montserrat text-sm">
        {pickupLocation && (
          <div className="flex items-center gap-2">
            <Image src="/position.png" alt="Location" width={16} height={16} className="invert opacity-80" />
            <span><strong>Départ:</strong> {pickupLocation}</span>
          </div>
        )}
        {returnLocation && returnLocation !== pickupLocation && (
          <div className="flex items-center gap-2">
            <Image src="/position.png" alt="Location" width={16} height={16} className="invert opacity-80" />
            <span><strong>Retour:</strong> {returnLocation}</span>
          </div>
        )}
        {startDate && endDate && (
          <div className="flex items-center gap-2">
            <Image src="/calendar.png" alt="Calendar" width={16} height={16} className="invert opacity-80" />
            <span>
              <strong>Période:</strong> {new Date(startDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })} - {new Date(endDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

