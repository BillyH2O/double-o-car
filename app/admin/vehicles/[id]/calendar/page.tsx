"use client"

import { useRouter, useParams } from "next/navigation"
import { useVehicle } from "@/hooks/useVehicle"
import VehicleCalendar from "@/components/admin/VehicleCalendar"
import Loader from "@/components/ui/Loader"
import Footer from "@/components/layout/footer"
import { VehicleCalendarHeader } from "@/components/admin/vehicles/VehicleCalendarHeader"

export default function VehicleCalendarPage() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string

  const { vehicle, loading, error } = useVehicle(id)

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-b from-[#001141] via-[#001a5c] to-black flex items-center justify-center">
        <Loader />
      </div>
    )
  }

  if (error || !vehicle) {
    return (
      <div className="min-h-screen bg-linear-to-b from-[#001141] via-[#001a5c] to-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-200 font-montserrat mb-4">{error || 'Véhicule non trouvé'}</p>
          <button
            onClick={() => router.push('/admin/vehicles')}
            className="bg-[#003CF0] text-white px-6 py-2 rounded-lg font-montserrat"
          >
            Retour
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-[#001141] via-[#001a5c] to-black flex flex-col">
      <VehicleCalendarHeader vehicle={vehicle} />

      <section className="pt-24 sm:pt-32 pb-12 sm:pb-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          <VehicleCalendar vehicle={vehicle} />
        </div>
      </section>

      <div className="mt-auto"><Footer /></div>
    </div>
  )
}

