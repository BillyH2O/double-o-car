import Image from "next/image";

export default function Simplicity() {
  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 relative">
      <div className="container mx-auto max-w-6xl">
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden h-[350px] sm:h-[450px] md:h-[500px]">
          <Image
            src="/image-femme-voiture.jpg"
            alt="Louez en toute simplicité"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent flex flex-col items-center justify-between text-center px-4 sm:px-6 py-8 sm:py-10 md:py-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-montserrat font-semibold font-weight-600 text-white">
              Louez en toute simplicité
            </h2>
            <p className="text-sm sm:text-base md:text-lg font-montserrat font-medium font-weight-500 text-white/90 max-w-3xl">
              Louez votre voiture en toute tranquillité grâce à un service simple et sans stress,
              pensé pour vous faire gagner du temps et rendre votre expérience plus agréable
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
