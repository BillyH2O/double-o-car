import { useRouter } from "next/navigation"
import { Vehicle } from "@/types"

interface VehicleDetailHeaderProps {
  vehicle: Vehicle
}

export function VehicleDetailHeader({ vehicle }: VehicleDetailHeaderProps) {
  const router = useRouter()

  return (
    <div className="lg:hidden flex items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
      <button
        onClick={() => router.push('/vehicules')}
        className="w-12 h-12 sm:w-14 sm:h-14 border-2 border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors shrink-0"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <div className="flex-1">
        <h1 className="text-white text-xl sm:text-2xl font-montserrat font-semibold mb-1 sm:mb-2">
          {vehicle.brand} <span className="font-bold">{vehicle.model}</span>
        </h1>
        <p className="text-white/60 font-montserrat text-sm sm:text-base">{vehicle.year}</p>
      </div>
    </div>
  )
}

