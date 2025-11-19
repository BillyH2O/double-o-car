"use client"

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Footer from '@/components/layout/footer'

export default function SuccessContent() {
  const params = useSearchParams()
  const router = useRouter()
  const sessionId = params.get('session_id')
  const [finalized, setFinalized] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    async function run() {
      if (!sessionId) {
        console.warn('[success-content] Pas de session_id')
        return
      }
      try {
        console.log('[success-content] Appel de /api/checkout/finalize avec session_id:', sessionId)
        const response = await fetch(`/api/checkout/finalize?session_id=${encodeURIComponent(sessionId)}`)
        
        if (!response.ok) {
          const errorText = await response.text()
          console.error('[success-content] Erreur lors de la finalisation:', response.status, errorText)
          if (!cancelled) {
            setError(`Erreur lors de la finalisation: ${errorText}`)
          }
          throw new Error(`Erreur ${response.status}: ${errorText}`)
        }
        
        const data = await response.json()
        console.log('[success-content] Finalisation réussie:', data)
        if (!cancelled) {
          setFinalized(true)
          setError(null)
        }
      } catch (error) {
        console.error('[success-content] Erreur lors de la finalisation:', error)
        if (!cancelled) {
          setError(error instanceof Error ? error.message : 'Une erreur est survenue')
        }
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [sessionId])

  return (
    <div className="min-h-screen bg-linear-to-b from-[#001141] via-[#001a5c] to-black">
      <div className="relative h-screen w-full max-w-7xl mx-auto flex items-center justify-center p-8">
        <div className="max-w-xl w-full text-center space-y-6">
          <div className="mb-6">
            <svg className="w-16 h-16 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white font-montserrat">Merci pour votre réservation</h1>
          {error ? (
            <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 mb-4">
              <p className="text-red-300 font-montserrat text-sm">{error}</p>
              <p className="text-red-200 font-montserrat text-xs mt-2">
                Votre paiement a été effectué, mais une erreur est survenue lors de la mise à jour. 
                Veuillez contacter le support avec votre numéro de session.
              </p>
            </div>
          ) : finalized ? (
            <p className="text-green-300 font-montserrat">✅ Votre réservation a été confirmée avec succès !</p>
          ) : (
            <p className="text-gray-300 font-montserrat">Traitement de votre réservation en cours...</p>
          )}
          {sessionId ? (
            <p className="text-sm text-gray-400 font-montserrat">
              Référence session: {sessionId.substring(0, 20)}...{finalized ? ' (confirmée)' : ''}
            </p>
          ) : (
            <p className="text-sm text-yellow-400 font-montserrat">
              ⚠️ Aucun identifiant de session trouvé dans l&apos;URL
            </p>
          )}
          <div className="pt-4">
            <button
              onClick={() => router.push('/')}
              className="inline-block rounded-full bg-[#003CF0] px-6 py-3 text-white hover:bg-[#0031c0] transition-colors font-montserrat font-semibold"
            >
              Revenir à l&apos;accueil
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

