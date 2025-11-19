import Image from "next/image";

export default function Simplicity() {
  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 relative">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 lg:gap-24 xl:gap-32">
          {/* Texte à gauche */}
          <div className="flex-1 w-full md:w-auto md:max-w-lg lg:max-w-xl flex flex-col justify-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-montserrat font-bold text-white mb-4 md:mb-6">
              Qui sommes-nous
            </h1>
            <p className="text-base sm:text-lg md:text-xl font-montserrat font-medium text-white/90 leading-relaxed mb-4">
              Louez votre voiture en toute tranquillité grâce à un service simple et sans stress,
              pensé pour vous faire gagner du temps et rendre votre expérience plus agréable.
            </p>
            <p className="text-base sm:text-lg md:text-xl font-montserrat font-medium text-white/90 leading-relaxed">
              Chez Double-O Car, nous mettons un point d&apos;honneur à vous offrir une expérience de location exceptionnelle. 
              Notre équipe dédiée est à votre écoute pour répondre à tous vos besoins et vous accompagner tout au long de votre location. 
              Que vous ayez besoin d&apos;un véhicule pour un week-end ou pour une longue durée, nous avons la solution adaptée à vos attentes.
            </p>
          </div>

          {/* Image à droite */}
          <div className="flex-1 w-full md:w-auto md:max-w-md lg:max-w-lg">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden h-[400px] sm:h-[550px] md:h-[650px] lg:h-[700px] w-full bg-black">
              <Image
                src="/image-femme-voiture.jpg"
                alt="Qui sommes-nous"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
