"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button/button"
import { useAdminAuth } from "@/hooks/useAdminAuth"
import Footer from "@/components/layout/footer"

export default function AdminLoginPage() {
  const [password, setPassword] = useState("")
  const router = useRouter()
  const { login, loading, error, setError } = useAdminAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const success = await login(password)
    if (success) {
      router.push("/admin")
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-[#001141] via-[#001a5c] to-black flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6">
        <div className="w-full max-w-md">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h1 className="text-3xl font-bold font-montserrat text-white mb-2 text-center">
              Accès Admin
            </h1>
            <p className="text-gray-300 font-montserrat mb-6 text-center">
              Veuillez entrer le mot de passe pour accéder au panneau d&apos;administration
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-white font-montserrat mb-2">
                  Mot de passe
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500 font-montserrat"
                  placeholder="Entrez le mot de passe"
                  required
                  autoFocus
                />
              </div>

              {error && (
                <div className="bg-red-500/20 border border-red-500 rounded-lg p-3">
                  <p className="text-red-200 font-montserrat text-sm">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#003CF0] hover:bg-[#0031c0] text-white py-3 rounded-lg font-montserrat font-semibold disabled:opacity-50"
              >
                {loading ? "Connexion..." : "Se connecter"}
              </Button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

