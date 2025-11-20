"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAdminAuth } from "@/hooks/useAdminAuth"
import Loader from "@/components/ui/Loader"

export function AdminProtection({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const router = useRouter()
  const pathname = usePathname()
  const { checkAuth } = useAdminAuth()

  useEffect(() => {
    // Ne pas vérifier l'authentification sur la page de login
    if (pathname?.includes("/admin/login")) {
      return
    }

    const verifyAuth = async () => {
      const authenticated = await checkAuth()
      setIsAuthenticated(authenticated)
      
      if (!authenticated) {
        router.push("/admin/login")
      }
    }

    verifyAuth()
  }, [router, pathname, checkAuth])

  // Ne pas protéger la page de login
  if (pathname?.includes("/admin/login")) {
    return <>{children}</>
  }

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-linear-to-b from-[#001141] via-[#001a5c] to-black flex items-center justify-center">
        <Loader />
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}

