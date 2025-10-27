import Image from "next/image";

const brands = [
  { name: "Renault", logo: "/renault.svg" },
  { name: "Dacia", logo: "/dacia.svg" },
  { name: "Peugeot", logo: "/peugeot.svg" },
  { name: "Hyundai", logo: "/hyundai.svg" },
];

export default function VehicleBrands() {
  return (
    <div className="mb-8 sm:mb-10 md:mb-12">
      <div className="flex flex-col items-center">
        <h2 className="text-gray-500 text-base sm:text-lg mb-4 sm:mb-6 text-left font-montserrat font-regular font-weight-400">
          Nos véhicules
        </h2>
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          {brands.map((brand) => (
            <div key={brand.name} className="bg-[#D9D9D91A] px-4 sm:px-6 py-2 sm:py-3 rounded-[20px] flex items-center gap-2 sm:gap-3">
              <Image src={brand.logo} alt={brand.name} width={24} height={24} className="brightness-0 invert w-5 h-5 sm:w-6 sm:h-6" />
              <span className="text-white text-sm sm:text-base">{brand.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
