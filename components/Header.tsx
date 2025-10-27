import Image from "next/image";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
        <div className="text-white">
          <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </div>
        <div className="flex-1 flex justify-center">
          <Image src="/logo.png" alt="Double-O Car" width={120} height={60} className="object-contain w-20 h-10 sm:w-[120px] sm:h-[60px]" />
        </div>
        <div className="text-white">
          <Image src="/globe.svg" alt="Language" width={24} height={24} className="invert w-5 h-5 sm:w-6 sm:h-6" />
        </div>
      </div>
    </header>
  );
}
