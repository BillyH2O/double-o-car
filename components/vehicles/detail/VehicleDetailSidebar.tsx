import { Vehicle } from "@/types"
import SearchForm from "@/components/form/SearchForm"
import VehicleCalendar from "@/components/admin/VehicleCalendar"
import CheckoutButton from "@/components/checkout/CheckoutButton"
import { useVehicleAvailability } from "@/hooks/useVehicleAvailability"
import { AvailabilityStatus } from "./AvailabilityStatus"

interface VehicleDetailSidebarProps {
  vehicle: Vehicle
  slug: string
  startDate?: string
  endDate?: string
  pickupLocation?: string
  returnLocation?: string
}

export function VehicleDetailSidebar({
  vehicle,
  slug,
  startDate,
  endDate,
  pickupLocation,
  returnLocation,
}: VehicleDetailSidebarProps) {
  const { available: isAvailable, reason: availabilityReason, loading: checkingAvailability } = useVehicleAvailability({
    slug,
    startDate,
    endDate,
  })

  return (
    <aside className="w-full lg:w-96 xl:w-[420px] shrink-0 space-y-6">
      <div>
        <SearchForm redirectTo={`/vehicules/${slug}`} />
      </div>

      <div className="bg-[#1a2847] rounded-2xl sm:rounded-3xl p-4 sm:p-6">
        <h2 className="text-white font-montserrat text-lg sm:text-xl mb-4">Disponibilités</h2>
        <VehicleCalendar
          vehicle={vehicle}
          compact={true}
          showStats={false}
          showAddButton={false}
          showPeriodsList={false}
        />
      </div>

      {startDate && endDate && (
        <AvailabilityStatus
          checkingAvailability={checkingAvailability}
          isAvailable={isAvailable}
          availabilityReason={availabilityReason}
        />
      )}

      {vehicle && startDate && endDate && isAvailable && (
        <CheckoutButton
          vehicleId={vehicle.id}
          startDate={startDate}
          endDate={endDate}
          pickupLocation={pickupLocation}
          returnLocation={returnLocation}
        />
      )}

      {(!startDate || !endDate) && (
        <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-xl p-4">
          <p className="text-yellow-300 text-sm font-montserrat text-center">
            ⚠️ Sélectionnez des dates pour réserver
          </p>
        </div>
      )}
    </aside>
  )
}

