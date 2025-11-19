import Image from "next/image"
import { Vehicle } from "@/types"
import { useRouter } from "next/navigation"

interface VehiclesTableProps {
  vehicles: Vehicle[]
  onDelete: (id: string) => void
}

export function VehiclesTable({ vehicles, onDelete }: VehiclesTableProps) {
  const router = useRouter()

  if (vehicles.length === 0) {
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6">
        <div className="text-center text-white/60 font-montserrat py-8">
          Aucun véhicule
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
              <th className="text-left text-white font-montserrat font-semibold py-3 px-4">Image</th>
              <th className="text-left text-white font-montserrat font-semibold py-3 px-4">Marque/Modèle</th>
              <th className="text-left text-white font-montserrat font-semibold py-3 px-4">Année</th>
              <th className="text-left text-white font-montserrat font-semibold py-3 px-4">Prix/jour</th>
              <th className="text-left text-white font-montserrat font-semibold py-3 px-4">Disponible</th>
              <th className="text-left text-white font-montserrat font-semibold py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <VehicleRow
                key={vehicle.id}
                vehicle={vehicle}
                onEdit={() => router.push(`/admin/vehicles/${vehicle.id}`)}
                onCalendar={() => router.push(`/admin/vehicles/${vehicle.id}/calendar`)}
                onDelete={() => onDelete(vehicle.id)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

interface VehicleRowProps {
  vehicle: Vehicle
  onEdit: () => void
  onCalendar: () => void
  onDelete: () => void
}

function VehicleRow({ vehicle, onEdit, onCalendar, onDelete }: VehicleRowProps) {
  return (
    <tr className="border-b border-white/10 hover:bg-white/5">
      <td className="py-3 px-4">
        <Image
          src={vehicle.image}
          alt={`${vehicle.brand} ${vehicle.model}`}
          width={80}
          height={60}
          className="object-cover rounded-lg"
        />
      </td>
      <td className="py-3 px-4">
        <div className="text-white font-montserrat">
          <div className="font-semibold">{vehicle.brand}</div>
          <div className="text-sm text-white/80">{vehicle.model}</div>
        </div>
      </td>
      <td className="py-3 px-4 text-white font-montserrat">{vehicle.year}</td>
      <td className="py-3 px-4 text-white font-montserrat font-semibold">
        {Number(vehicle.pricePerDay)}€
      </td>
      <td className="py-3 px-4">
        <span
          className={`px-2 py-1 rounded text-xs font-montserrat ${
            vehicle.isAvailable
              ? 'bg-green-500/20 text-green-300'
              : 'bg-red-500/20 text-red-300'
          }`}
        >
          {vehicle.isAvailable ? 'Oui' : 'Non'}
        </span>
      </td>
      <td className="py-3 px-4">
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={onEdit}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm font-montserrat"
          >
            Modifier
          </button>
          <button
            onClick={onCalendar}
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm font-montserrat"
          >
            Calendrier
          </button>
          <button
            onClick={onDelete}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm font-montserrat"
          >
            Supprimer
          </button>
        </div>
      </td>
    </tr>
  )
}

