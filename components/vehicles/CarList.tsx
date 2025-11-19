"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";


export default function CarList() {
  const router = useRouter();
  
  useEffect(() => {
    // Rediriger vers la page /vehicules
    router.push('/vehicules');
  }, [router]);

  // Afficher un message de chargement pendant la redirection
  return (
    <div className="min-h-screen bg-linear-to-b from-[#001141] via-[#001a5c] to-black flex items-center justify-center">
      <div className="text-white font-montserrat">Redirection...</div>
    </div>
  );
}
