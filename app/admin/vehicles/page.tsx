"use client"

import { useRouter } from "next/navigation"
import { useAdminVehicles } from "@/hooks/useAdminVehicles"
import { useDeleteVehicle } from "@/hooks/useDeleteVehicle"
import Loader from "@/components/ui/Loader"
import Footer from "@/components/layout/footer"
import { AdminHeader } from "@/components/admin/shared/AdminHeader"
import { VehiclesTable } from "@/components/admin/vehicles/VehiclesTable"

export default function AdminVehiclesPage() {
  const router = useRouter()
  const { vehicles, loading, error, refetch } = useAdminVehicles()
  const { deleteVehicle } = useDeleteVehicle()

  const handleDelete = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce véhicule ?')) {
      const success = await deleteVehicle(id)
      if (success) {
        refetch()
      }
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-[#001141] via-[#001a5c] to-black flex flex-col">
      <AdminHeader
        title="Gestion des véhicules"
        backUrl="/admin"
      />

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

          {!loading && !error && (
            <div className="space-y-6">
              <div className="flex justify-end">
                <button
                  onClick={() => router.push('/admin/vehicles/new')}
                  className="bg-[#003CF0] hover:bg-[#0031c0] text-white px-4 py-2 rounded-lg font-montserrat font-semibold text-sm w-full sm:w-auto"
                >
                  + Ajouter
                </button>
              </div>
              <VehiclesTable vehicles={vehicles} onDelete={handleDelete} />
            </div>
          )}
        </div>
      </section>

      <div className="mt-auto"><Footer /></div>
    </div>
  )
}

