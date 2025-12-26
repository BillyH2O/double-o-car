"use client"

import { cn } from '@/lib/utils'
import { useCheckout } from '@/hooks/useCheckout'
import { useTranslations } from 'next-intl'

type Props = {
  vehicleId: string
  startDate?: string
  endDate?: string
  pickupLocation?: string
  returnLocation?: string
  className?: string
}

export default function CheckoutButton({ 
  vehicleId, 
  startDate,
  endDate,
  pickupLocation,
  returnLocation,
  className, 
}: Props) {
  const { startCheckout, loading } = useCheckout()
  const t = useTranslations("checkout")
  return (
    <button
      onClick={() => {
        console.debug('[CheckoutButton] click', { vehicleId, startDate, endDate, pickupLocation, returnLocation })
        startCheckout(vehicleId, { startDate, endDate, pickupLocation, returnLocation })
      }}
      disabled={loading}
      className={cn(
        'w-full bg-[#003CF0] text-white font-montserrat font-semibold text-base sm:text-lg py-3.5 sm:py-4 rounded-full hover:bg-[#0031c0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer',
        className
      )}
    >
      {loading ? t("redirecting") : t("checkoutButton")}
    </button>
  )
}





