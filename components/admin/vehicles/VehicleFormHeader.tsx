import { AdminHeader } from "../shared/AdminHeader"

interface VehicleFormHeaderProps {
  isNew: boolean
}

export function VehicleFormHeader({ isNew }: VehicleFormHeaderProps) {
  return (
    <AdminHeader
      title={isNew ? 'Nouveau véhicule' : 'Modifier le véhicule'}
      backUrl="/admin/vehicles"
    />
  )
}

