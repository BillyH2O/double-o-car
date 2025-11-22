"use client";

import { Suspense } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useVehicleBySlug } from "@/hooks/useVehicleBySlug";
import { useVehicleMapping } from "@/hooks/useVehicleMapping";
import Loader from "@/components/ui/Loader";
import { Navbar } from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { VehicleDetailHeader } from "@/components/vehicles/detail/VehicleDetailHeader";
import { VehicleDetailTitle } from "@/components/vehicles/detail/VehicleDetailTitle";
import { VehicleImage } from "@/components/vehicles/detail/VehicleImage";
import { VehicleCharacteristics } from "@/components/vehicles/detail/VehicleCharacteristics";
import { VehiclePricing } from "@/components/vehicles/detail/VehiclePricing";
import { VehicleDescription } from "@/components/vehicles/detail/VehicleDescription";
import { VehicleFeatures } from "@/components/vehicles/detail/VehicleFeatures";
import { VehicleDetailSidebar } from "@/components/vehicles/detail/VehicleDetailSidebar";
import { VehicleErrorState } from "@/components/vehicles/detail/VehicleErrorState";
import { useTranslations } from "next-intl";

function VehiculeDetailPageContent() {
  const t = useTranslations("vehicle");
  const params = useParams();
  const searchParams = useSearchParams();
  const slug = params?.slug as string;

  // Récupérer les paramètres de recherche depuis l'URL
  const startDate = searchParams?.get('startDate') || undefined;
  const endDate = searchParams?.get('endDate') || undefined;
  const pickupLocation = searchParams?.get('pickupLocation') || undefined;
  const returnLocation = searchParams?.get('returnLocation') || undefined;

  // Hooks pour la gestion des données
  const { vehicle, loading, error } = useVehicleBySlug(slug);
  const { car } = useVehicleMapping(vehicle);

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-b from-[#001141] via-[#001a5c] to-black flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error || !vehicle || !car) {
    return <VehicleErrorState error={error || t("vehicleNotFound")} />;
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-[#001141] via-[#001a5c] to-black">
      <Navbar />

      <section className="pt-24 sm:pt-32 pb-12 sm:pb-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl">
          <VehicleDetailHeader vehicle={vehicle} />

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            <VehicleDetailSidebar
              vehicle={vehicle}
              slug={slug}
              startDate={startDate}
              endDate={endDate}
              pickupLocation={pickupLocation}
              returnLocation={returnLocation}
            />

            <main className="flex-1 min-w-0 space-y-6">
              <VehicleDetailTitle vehicle={vehicle} />
              <VehicleImage vehicle={vehicle} />

              <VehicleDescription vehicle={vehicle} />
              <VehicleFeatures vehicle={vehicle} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <VehicleCharacteristics vehicle={vehicle} car={car} />
                <VehiclePricing vehicle={vehicle} car={car} />
              </div>
              
            </main>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function VehiculeDetailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-linear-to-b from-[#001141] via-[#001a5c] to-black flex items-center justify-center">
        <Loader />
      </div>
    }>
      <VehiculeDetailPageContent />
    </Suspense>
  );
}

