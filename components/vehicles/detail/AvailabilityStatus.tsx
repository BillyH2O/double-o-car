import { useTranslations } from "next-intl"

interface AvailabilityStatusProps {
  checkingAvailability: boolean
  isAvailable: boolean
  availabilityReason?: string
}

export function AvailabilityStatus({
  checkingAvailability,
  isAvailable,
  availabilityReason,
}: AvailabilityStatusProps) {
  const t = useTranslations("vehicle")
  
  if (checkingAvailability) {
    return (
      <div className="bg-blue-500/20 border border-blue-500/50 rounded-xl p-4 text-center">
        <p className="text-blue-300 font-montserrat text-sm">
          {t("checkingAvailability")}
        </p>
      </div>
    )
  }

  if (!isAvailable) {
    return (
      <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-red-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="flex-1">
            <p className="text-red-300 font-montserrat font-semibold mb-1 text-sm">
              {t("vehicleUnavailable")}
            </p>
            {availabilityReason && (
              <p className="text-red-200 font-montserrat text-xs">
                {availabilityReason}
              </p>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-4">
      <div className="flex items-center gap-3">
        <svg className="w-5 h-5 text-green-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-green-300 font-montserrat text-sm">
          {t("availableForPeriod")}
        </p>
      </div>
    </div>
  )
}

