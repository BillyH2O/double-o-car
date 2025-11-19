"use client"

import Loader from "@/components/ui/Loader"
import Footer from "@/components/layout/footer"
import { useBookings } from "@/hooks/useBookings"
import { AdminBookingsHeader } from "@/components/admin/bookings/AdminBookingsHeader"
import { BookingsTable } from "@/components/admin/bookings/BookingsTable"

export default function AdminBookingsPage() {
  const { bookings, loading, error } = useBookings()

  return (
    <div className="min-h-screen bg-linear-to-b from-[#001141] via-[#001a5c] to-black flex flex-col">
      <AdminBookingsHeader />

      <section className="pt-24 sm:pt-32 pb-12 sm:pb-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          {loading && (
            <div className="text-center py-12">
              <Loader />
            </div>
          )}

          {error && (
            <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 mb-6">
              <p className="text-red-200 font-montserrat">{error}</p>
            </div>
          )}

          {!loading && !error && <BookingsTable bookings={bookings} />}
        </div>
      </section>

      <div className="mt-auto"><Footer /></div>
    </div>
  )
}

