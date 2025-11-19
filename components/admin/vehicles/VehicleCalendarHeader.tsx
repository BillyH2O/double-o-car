import { AdminHeader } from "../shared/AdminHeader"
import { Vehicle } from "@/types"

interface VehicleCalendarHeaderProps {
  vehicle: Vehicle
}

export function VehicleCalendarHeader({ vehicle }: VehicleCalendarHeaderProps) {
  return (
    <AdminHeader
      title={`Calendrier - ${vehicle.brand} ${vehicle.model}`}
      backUrl="/admin/vehicles"
    />
  )
}

