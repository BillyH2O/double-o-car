import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"

interface VehicleErrorStateProps {
  error: string
}

export function VehicleErrorState({ error }: VehicleErrorStateProps) {
  const router = useRouter()
  const t = useTranslations("vehicle")

  return (
    <div className="min-h-screen bg-linear-to-b from-[#001141] via-[#001a5c] to-black flex items-center justify-center">
      <div className="text-center">
        <p className="text-red-200 font-montserrat mb-4">{error}</p>
        <button
          onClick={() => router.push('/vehicules')}
          className="bg-[#003CF0] text-white px-6 py-2 rounded-lg font-montserrat"
        >
          {t("backToList")}
        </button>
      </div>
    </div>
  )
}

