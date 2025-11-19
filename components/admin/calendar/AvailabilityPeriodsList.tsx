import { Booking, Availability } from "@/lib/services/vehicleAvailabilityService"

interface AvailabilityPeriodsListProps {
  bookings: Booking[]
  availability: Availability[]
  showAddButton?: boolean
  onAddClick: () => void
  onDelete: (availabilityId: string) => void
}

export function AvailabilityPeriodsList({
  bookings,
  availability,
  showAddButton,
  onAddClick,
  onDelete,
}: AvailabilityPeriodsListProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-white text-lg font-montserrat font-semibold">Périodes d&apos;indisponibilité</h3>
        {showAddButton && (
          <button
            onClick={onAddClick}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-montserrat text-sm"
          >
            + Ajouter une période
          </button>
        )}
      </div>

      <div className="space-y-2">
        {bookings
          .filter((booking) => booking.status === 'CONFIRMED' || booking.status === 'ACTIVE')
          .map((booking) => (
            <div
              key={`booking-${booking.id}`}
              className="bg-blue-500/20 border border-blue-500/50 rounded-lg p-3 flex items-center justify-between"
            >
              <div className="text-white font-montserrat text-sm">
                <div className="font-semibold">
                  {new Date(booking.startDate).toLocaleDateString('fr-FR')} -{' '}
                  {new Date(booking.endDate).toLocaleDateString('fr-FR')}
                </div>
                <div className="text-white/80 text-xs mt-1">
                  Réservation {booking.status === 'CONFIRMED' ? 'confirmée' : 'active'} #{booking.id.substring(0, 8)}
                </div>
              </div>
              <div className="text-blue-300 text-xs font-montserrat px-2 py-1 rounded bg-blue-500/30">
                Réservation
              </div>
            </div>
          ))}
        
        {availability
          .filter((period) => !period.isAvailable)
          .map((period) => (
            <div
              key={period.id}
              className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 flex items-center justify-between"
            >
              <div className="text-white font-montserrat text-sm">
                <div className="font-semibold">
                  {new Date(period.startDate).toLocaleDateString('fr-FR')} -{' '}
                  {new Date(period.endDate).toLocaleDateString('fr-FR')}
                </div>
                {period.reason && (
                  <div className="text-white/80 text-xs mt-1">{period.reason}</div>
                )}
              </div>
              <button
                onClick={() => onDelete(period.id)}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs font-montserrat"
              >
                Supprimer
              </button>
            </div>
          ))}
      </div>
    </div>
  )
}

