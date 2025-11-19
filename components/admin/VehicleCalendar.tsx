"use client"

import { useState, useRef } from "react"
import { Vehicle } from "@/types"
import { useVehicleAvailabilityPeriods } from "@/hooks/useVehicleAvailabilityPeriods"
import Loader from "@/components/ui/Loader"
import { CalendarStats } from "./calendar/CalendarStats"
import { CalendarControls } from "./calendar/CalendarControls"
import { CalendarLegend } from "./calendar/CalendarLegend"
import { CalendarGrid } from "./calendar/CalendarGrid"
import { AvailabilityPeriodsList } from "./calendar/AvailabilityPeriodsList"
import { AddAvailabilityModal } from "./calendar/AddAvailabilityModal"

interface VehicleCalendarProps {
  vehicle: Vehicle
  compact?: boolean // Mode compact pour la page publique
  showStats?: boolean // Afficher les statistiques (admin uniquement)
  showAddButton?: boolean // Afficher le bouton d'ajout de période (admin uniquement)
  showPeriodsList?: boolean // Afficher la liste des périodes (admin uniquement)
}

export default function VehicleCalendar({ 
  vehicle, 
  compact = false,
  showStats = true,
  showAddButton = true,
  showPeriodsList = true
}: VehicleCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [showAddModal, setShowAddModal] = useState(false)
  const statsRefetchRef = useRef<(() => Promise<void>) | null>(null)

  const {
    bookings,
    availability,
    loading,
    createPeriod,
    deletePeriod,
  } = useVehicleAvailabilityPeriods(vehicle.id)

  const handleAddPeriod = async (data: { startDate: string; endDate: string; reason?: string }) => {
    await createPeriod(data)
    // Rafraîchir les stats après ajout
    if (statsRefetchRef.current) {
      await statsRefetchRef.current()
    }
  }

  const handleDeletePeriod = async (availabilityId: string) => {
    if (!confirm('Supprimer cette période d\'indisponibilité ?')) {
      return
    }

    try {
      await deletePeriod(availabilityId)
      // Rafraîchir les stats après suppression
      if (statsRefetchRef.current) {
        await statsRefetchRef.current()
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Erreur')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader />
      </div>
    )
  }

  return (
    <div className={compact ? "space-y-3" : "space-y-6"}>
      {showStats && (
        <CalendarStats 
          vehicleId={vehicle.id}
          refetchRef={statsRefetchRef}
        />
      )}

      <CalendarControls
        currentMonth={currentMonth}
        compact={compact}
        onMonthChange={setCurrentMonth}
      />

      <CalendarLegend compact={compact} />

      <CalendarGrid
        currentMonth={currentMonth}
        bookings={bookings}
        availability={availability}
        compact={compact}
      />

      {showPeriodsList && (
        <AvailabilityPeriodsList
          bookings={bookings}
          availability={availability}
          showAddButton={showAddButton}
          onAddClick={() => setShowAddModal(true)}
          onDelete={handleDeletePeriod}
        />
      )}

      <AddAvailabilityModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddPeriod}
      />
    </div>
  )
}
 