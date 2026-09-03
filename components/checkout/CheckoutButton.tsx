"use client"

import { useState } from 'react'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { cn } from '@/lib/utils'
import { useCheckout } from '@/hooks/useCheckout'
import { useTranslations } from 'next-intl'
import { LEGAL_PATHS } from '@/lib/legal/company'

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
  const locale = useLocale()
  const [accepted, setAccepted] = useState(false)

  return (
    <div className="space-y-3">
      <label className="flex items-start gap-2 text-xs text-white/80 cursor-pointer">
        <input
          type="checkbox"
          className="mt-0.5"
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
        />
        <span>
          {t("acceptCgl")}{' '}
          <Link href={`/${locale}${LEGAL_PATHS.cgl}`} target="_blank" className="underline text-[#7EB0FF]">
            {t("cglLink")}
          </Link>
        </span>
      </label>
      <button
        onClick={() => {
          if (!accepted) return
          startCheckout(vehicleId, { startDate, endDate, pickupLocation, returnLocation })
        }}
        disabled={loading || !accepted}
        className={cn(
          'w-full bg-[#003CF0] text-white font-montserrat font-semibold text-base sm:text-lg py-3.5 sm:py-4 rounded-full hover:bg-[#0031c0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer',
          className
        )}
      >
        {loading ? t("redirecting") : t("checkoutButton")}
      </button>
    </div>
  )
}
