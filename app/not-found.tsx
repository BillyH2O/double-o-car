import Link from "next/link"
import { Button } from "@/components/ui/button/button"
import Footer from "@/components/layout/footer"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-linear-to-b from-[#001141] via-[#001a5c] to-black flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-6xl sm:text-8xl md:text-9xl font-bold font-montserrat text-white mb-4">
            404
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-montserrat text-white mb-4">
            Page non trouvée
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 font-montserrat mb-8">
            Désolé, la page que vous recherchez n&apos;existe pas ou a été déplacée.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button className="bg-[#003CF0] hover:cursor-pointer hover:bg-[#0031c0] text-white px-6 py-3 rounded-lg font-montserrat font-semibold">
                Retour à l&apos;accueil
              </Button>
            </Link>
            <Link href="/vehicules">
              <Button variant="outline" className="hover:cursor-pointer text-black border-white/30 hover:bg-white/80 px-6 py-3 rounded-lg font-montserrat font-semibold">
                Voir nos véhicules
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

