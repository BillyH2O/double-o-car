"use client"

import { useRouter } from 'next/navigation'
import Footer from "@/components/layout/footer"

export default function CheckoutCancelPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-linear-to-b from-[#001141] via-[#001a5c] to-black flex items-center justify-center p-6">
      <div className="max-w-xl w-full text-center space-y-4">
        <div className="mb-6">
          <svg className="w-16 h-16 mx-auto text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-white font-montserrat">Paiement annulé</h1>
        <p className="text-gray-300 font-montserrat">Vous pouvez réessayer quand vous voulez.</p>
        <div className="pt-4">
          <button
            onClick={() => router.push('/vehicules')}
            className="inline-block rounded-full bg-[#003CF0] px-6 py-3 text-white hover:bg-[#0031c0] transition-colors font-montserrat font-semibold"
          >
            Retour aux véhicules
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}

