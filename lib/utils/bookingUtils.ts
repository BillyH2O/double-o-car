import { BookingStatus } from "@/types"

export const getStatusColor = (status: string): string => {
  switch (status) {
    case BookingStatus.CONFIRMED:
      return 'bg-green-500/20 text-green-300'
    case BookingStatus.PENDING:
      return 'bg-yellow-500/20 text-yellow-300'
    case BookingStatus.ACTIVE:
      return 'bg-blue-500/20 text-blue-300'
    case BookingStatus.COMPLETED:
      return 'bg-gray-500/20 text-gray-300'
    case BookingStatus.CANCELLED:
      return 'bg-red-500/20 text-red-300'
    default:
      return 'bg-white/20 text-white'
  }
}

export const getStatusLabel = (status: string): string => {
  const labels: Record<string, string> = {
    [BookingStatus.PENDING]: 'En attente',
    [BookingStatus.CONFIRMED]: 'Confirmée',
    [BookingStatus.ACTIVE]: 'En cours',
    [BookingStatus.COMPLETED]: 'Terminée',
    [BookingStatus.CANCELLED]: 'Annulée',
  }
  return labels[status] || status
}

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('fr-FR')
}

export const formatPrice = (price: number | string): string => {
  return `${Number(price)}€`
}

