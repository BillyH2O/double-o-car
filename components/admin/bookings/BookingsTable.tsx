import { Booking } from "@/types"
import { getStatusColor, getStatusLabel, formatDate, formatPrice } from "@/lib/utils/bookingUtils"

interface BookingsTableProps {
  bookings: Booking[]
}

export function BookingsTable({ bookings }: BookingsTableProps) {
  if (bookings.length === 0) {
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6">
        <div className="text-center text-white/60 font-montserrat py-8">
          Aucune réservation
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/20">
              <th className="text-left text-white font-montserrat font-semibold py-3 px-4">Véhicule</th>
              <th className="text-left text-white font-montserrat font-semibold py-3 px-4">Client</th>
              <th className="text-left text-white font-montserrat font-semibold py-3 px-4">Période</th>
              <th className="text-left text-white font-montserrat font-semibold py-3 px-4">Prix total</th>
              <th className="text-left text-white font-montserrat font-semibold py-3 px-4">Statut</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <BookingRow key={booking.id} booking={booking} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function BookingRow({ booking }: { booking: Booking }) {
  return (
    <tr className="border-b border-white/10 hover:bg-white/5">
      <td className="py-3 px-4">
        <div className="text-white font-montserrat">
          <div className="font-semibold">{booking.vehicle.brand}</div>
          <div className="text-sm text-white/80">{booking.vehicle.model}</div>
        </div>
      </td>
      <td className="py-3 px-4">
        <div className="text-white font-montserrat text-sm">
          {booking.guestFirstName && booking.guestLastName ? (
            <>
              <div>{booking.guestFirstName} {booking.guestLastName}</div>
              <div className="text-white/60">{booking.guestEmail}</div>
              {booking.guestPhone && (
                <div className="text-white/60">{booking.guestPhone}</div>
              )}
            </>
          ) : (
            <div className="text-white/60">Invité</div>
          )}
        </div>
      </td>
      <td className="py-3 px-4">
        <div className="text-white font-montserrat text-sm">
          <div>{formatDate(booking.startDate)}</div>
          <div className="text-white/60">au {formatDate(booking.endDate)}</div>
          {booking.pickupLocation && (
            <div className="text-white/60 text-xs mt-1">📍 {booking.pickupLocation}</div>
          )}
        </div>
      </td>
      <td className="py-3 px-4 text-white font-montserrat font-semibold">
        {formatPrice(booking.totalPrice)}
      </td>
      <td className="py-3 px-4">
        <span className={`px-2 py-1 rounded text-xs font-montserrat ${getStatusColor(booking.status)}`}>
          {getStatusLabel(booking.status)}
        </span>
      </td>
    </tr>
  )
}

