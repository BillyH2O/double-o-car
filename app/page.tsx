"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import VehicleBrands from "@/components/VehicleBrands";
import BookingForm from "@/components/BookingForm";
import Simplicity from "@/components/Simplicity";
import Reviews from "@/components/Reviews";
import CarList from "@/components/CarList";

export default function Home() {
  const [showResults, setShowResults] = useState(false);

  if (showResults) {
    return <CarList onBack={() => setShowResults(false)} />;
  }

  return (
    <div className="min-h-screen bg-linear-to-t from-black via-blue-950 to-black">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-14 md:pb-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <Hero />
          <VehicleBrands />
          <BookingForm onSearch={() => setShowResults(true)} />
        </div>
      </section>

      <Simplicity />
      <Reviews />
      <Footer />
    </div>
  );
}
