"use client";

import { Suspense } from "react";
import { useVehicles } from "@/hooks/useVehicles";
import { useVehicleFilters } from "@/hooks/useVehicleFilters";
import { useVehicleNavigation } from "@/hooks/useVehicleNavigation";
import { useVehiclesMapping } from "@/hooks/useVehicleMapping";
import SearchForm from "@/components/form/SearchForm";
import VehicleFilters from "@/components/vehicles/VehicleFilters";
import VehicleList from "@/components/vehicles/VehicleList";
import SearchCriteria from "@/components/vehicles/SearchCriteria";
import { Navbar } from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Loader from "@/components/ui/Loader";
function VehiculesPageContent() {
  // Hooks personnalisés pour la logique métier
  const {
    filters,
    setFilters,
    urlStartDate,
    urlEndDate,
    urlPickupLocation,
    urlReturnLocation,
  } = useVehicleFilters();

  const { vehicles, loading, error } = useVehicles({
    isAvailable: true,
    brand: filters.brand || undefined,
    fuelType: filters.fuelType || undefined,
    transmission: filters.transmission || undefined,
    startDate: urlStartDate,
    endDate: urlEndDate,
  });

  const { cars } = useVehiclesMapping(vehicles);

  const { navigateToVehicle } = useVehicleNavigation({
    urlStartDate,
    urlEndDate,
    urlPickupLocation,
    urlReturnLocation,
  });

  return (
    <div className="min-h-screen bg-linear-to-b from-[#001141] via-[#001a5c] to-black">
      <Navbar />

      {/* Results Section */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Layout: Sidebar + Main Content */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Sidebar - Formulaire de recherche, critères et filtres */}
            <aside className="w-full lg:w-80 xl:w-96 shrink-0 space-y-6">
              {/* Search Form */}
              <div>
                <SearchForm redirectTo="/vehicules" />
              </div>

              {/* Informations de recherche */}
              <SearchCriteria
                pickupLocation={urlPickupLocation}
                returnLocation={urlReturnLocation}
                startDate={urlStartDate}
                endDate={urlEndDate}
              />

              {/* Filtres */}
              <VehicleFilters
                filters={filters}
                onFiltersChange={setFilters}
                vehicles={vehicles}
              />
            </aside>

            {/* Main Content - Liste des véhicules */}
            <main className="flex-1 min-w-0">
              <VehicleList
                cars={cars}
                vehicles={vehicles}
                onVehicleClick={navigateToVehicle}
                loading={loading}
                error={error}
              />
            </main>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default function VehiculesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-linear-to-b from-[#001141] via-[#001a5c] to-black">
        <Navbar />
        <div className="pt-24 sm:pt-32 pb-12 sm:pb-16 px-4 sm:px-6">
          <div className="container mx-auto max-w-7xl">
            <div className="flex items-center justify-center min-h-[400px]">
              <Loader />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    }>
      <VehiculesPageContent />
    </Suspense>
  );
}

