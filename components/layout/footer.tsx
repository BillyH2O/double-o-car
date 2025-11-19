import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-black py-8 sm:py-12 px-4 sm:px-6 border-t border-gray-800">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-center mb-6 sm:mb-8">
          <Image src="/logo.png" alt="Double-O Car" width={100} height={50} className="object-contain w-20 h-10 sm:w-[100px] sm:h-[50px]" />
        </div>
        <nav className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 font-montserrat font-light font-weight-300 text-[#FFFFFF] text-xs sm:text-sm">
          <a href="#" className="hover:text-white transition-colors">Mentions légales</a>
          <a href="#" className="hover:text-white transition-colors">À propos</a>
          <a href="#" className="hover:text-white transition-colors">Nous contacter</a>
          <a href="#" className="hover:text-white transition-colors">Conditions de location</a>
        </nav>
        <div className="text-center text-[#D9D9D980] text-xs sm:text-sm mt-6 sm:mt-8">
          Développé par <span className="text-[#003CF0]">Blue</span>Studio ©
        </div>
      </div>
    </footer>
  );
}
