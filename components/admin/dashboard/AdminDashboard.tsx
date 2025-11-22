import { useRouter } from "next/navigation"
import { GlobalStats } from "./GlobalStats"

export function AdminDashboard() {
  const router = useRouter()

  return (
    <div className="space-y-6">
      {/* Statistiques globales */}
      <GlobalStats />

      {/* Gestion du site */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8">
        <h2 className="text-white text-2xl font-montserrat font-semibold mb-6">Gestion du site</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DashboardCard
          icon={
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
            </svg>
          }
          title="Véhicules"
          description="Gérer les véhicules : ajouter, modifier, supprimer"
          onClick={() => router.push('/admin/vehicles')}
        />

        <DashboardCard
          icon={
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          }
          title="Réservations"
          description="Voir et gérer les réservations"
          onClick={() => router.push('/admin/bookings')}
        />
        </div>
      </div>
    </div>
  )
}

interface DashboardCardProps {
  icon: React.ReactNode
  title: string
  description: string
  onClick: () => void
}

function DashboardCard({ icon, title, description, onClick }: DashboardCardProps) {
  return (
    <button
      onClick={onClick}
      className="hover:cursor-pointer bg-[#003CF0] hover:bg-[#003CF0]/70 text-white rounded-xl p-6 transition-colors text-left"
    >
      <div className="flex items-center gap-4 mb-2">
        {icon}
        <h3 className="text-xl font-montserrat font-semibold">{title}</h3>
      </div>
      <p className="text-white/80 font-montserrat text-sm">{description}</p>
    </button>
  )
}

