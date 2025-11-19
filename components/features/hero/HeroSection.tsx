
import CarList from '@/components/vehicles/CarList'
import CompactBookingForm from '@/components/form/CompactBookingForm'
import TextBlend from '@/components/ui/text/TextBlend'
import VehicleBrands from '@/components/vehicles/VehicleBrands'
import { useState } from 'react'

const HeroSection = () => {
    const [showResults] = useState(false);

    if (showResults) {
      return <CarList />;
    }
  return (
    <section className="pt-42 container mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14 flex flex-col items-center justify-center gap-16">
        <TextBlend />
        <CompactBookingForm />
        <VehicleBrands />
    </section>
  )
}

export default HeroSection