"use client"

import CompactBookingForm from '@/components/form/CompactBookingForm';
import VehicleBrands from '@/components/vehicles/VehicleBrands';

interface HeroSectionProps {
  backgroundImage: string;
  darkEffect?: boolean;
  title: string;
  description: string;
}

const HeroSection3 = ({ 
  backgroundImage, 
  darkEffect = false,
  title, 
  description, 
}: HeroSectionProps) => {
  return (
    <section 
      className="relative w-full bg-cover bg-center cn mb-24 max-h-[350px] sm:max-h-[500px] md:max-h-[600px] pb-28 sm:pb-16 md:pb-36"
      style={{ backgroundImage: `url('${backgroundImage}')` }}  
    >
      
      {darkEffect && <div className="absolute inset-0 bg-black/30 z-10" />}
      <div className="relative w-full max-w-7xl mx-auto flex flex-col items-center justify-center gap-8 lg:gap-12 pt-28 sm:pt-36 md:pt-40 lg:pt-48 xl:pt-64 2xl:pt-72 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14 text-white z-20">
          <div className='w-full flex flex-col items-start justify-center gap-8 lg:gap-12  sm:mb-20 xl:mb-35'>
            <h1 className='w-full md:max-w-[800px] lg:max-w-[1000px] xl:max-w-[1000px] text-3xl sm:text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl font-bold font-montserrat font-regular font-weight-400 text-white text-left'>{title}</h1>
            <p className='w-full max-w-6xl md:w-full text-lg font-medium md:text-2xl font-montserrat font-regular text-gray-300 text-left'>{description}</p>
          </div>
          <div className="w-full flex flex-col items-center justify-center z-20">
              <CompactBookingForm />
          </div>
      </div>
    </section>
  )
}

export default HeroSection3