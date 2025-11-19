
import Image from "next/image"
import Link from "next/link"

interface AdminHeaderProps {
  title: string
  backUrl?: string
  rightAction?: React.ReactNode
}

export function AdminHeader({ title, backUrl, rightAction }: AdminHeaderProps) {

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
        {/* Logo */}
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
        <div className="flex-1 flex justify-center">
          <h1 className="text-white text-lg sm:text-xl font-montserrat font-bold">{title}</h1>
        </div>

        {/* Bouton retour au site */}
        <div className="flex items-center gap-4">
          {rightAction && <div>{rightAction}</div>}
          <Link
            href={backUrl || "/"}
            className="bg-[#003CF0] hover:bg-[#0031c0] text-white px-4 py-2 rounded-lg font-montserrat font-semibold text-sm transition-colors"
          >
            Retour au site
          </Link>
        </div>
      </div>
    </header>
  )
}

