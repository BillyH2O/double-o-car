"use client"

import Image from "next/image"
import Link from "next/link"

interface AdminHeaderProps {
  title: string
  backUrl?: string
  rightAction?: React.ReactNode
}

export function AdminHeader({ title, backUrl, rightAction }: AdminHeaderProps) {
  const btnNameDesktop = "Retour au site"
  const btnNameMobile = "Retour"
  const btnName = typeof window !== "undefined" && window.innerWidth < 768 ? btnNameMobile : btnNameDesktop
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
        {/* Logo */}
        <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center">
          <Image 
            src="/logo.png" 
            alt="Double-O Car" 
            width={100} 
            height={50} 
            className="object-contain h-8 sm:h-10 w-auto"
          />
        </Link>
        
        {/* Titre au centre */}
          <h1 className="text-white text-sm sm:text-xl font-montserrat font-bold">{title}</h1>
        </div>
        {/* Bouton retour au site */}
        <div className="flex items-center gap-4">
          {rightAction && <div>{rightAction}</div>}
          <Link
            href={backUrl || "/"}
            className="bg-red-900 hover:bg-red-800 text-white px-4 py-2 rounded-lg font-montserrat font-semibold text-sm transition-colors"
          >
            {btnName}
          </Link>
        </div>
      </div>
    </header>
  )
}

