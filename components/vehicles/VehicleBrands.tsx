import Image from "next/image";

const brands = [
  { name: "Renault", logo: "/renault.png" },
  { name: "Dacia", logo: "/dacia.svg" },
  { name: "Peugeot", logo: "/peugeot.svg" },
  { name: "Hyundai", logo: "/hyundai.svg" },
];

export default function VehicleBrands() {
  return (
    <div className="flex flex-col items-start w-full gap-4 mb-8 sm:mb-10 md:mb-12 xl:mb-14 2xl:mb-16">
        <h2 className="md:hidden text-gray-500 text-base sm:text-lg xl:text-xl 2xl:text-2xl text-left font-montserrat font-regular font-weight-400">
          Nos véhicules
        </h2>
        <div className="flex flex-wrap justify-item gap-3 sm:gap-4 xl:gap-12 2xl:gap-12 w-full">
          {brands.map((brand) => (
            <div key={brand.name} className="bg-[#D9D9D91A] px-4 py-2 sm:py-3 xl:px-5 xl:py-4 2xl:px-6 2xl:py-5 rounded-[20px] xl:rounded-[24px] 2xl:rounded-[28px] flex items-center gap-2 sm:gap-3 xl:gap-4 2xl:gap-5">
              <Image src={brand.logo} alt={brand.name} width={24} height={24} className="brightness-0 invert w-5 h-5 sm:w-6 sm:h-6 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8" />
              <span className="text-white text-sm sm:text-base xl:text-lg 2xl:text-xl font-montserrat font-regular font-weight-400">{brand.name}</span>
            </div>
          ))}
        </div>
      </div>
  );
}
