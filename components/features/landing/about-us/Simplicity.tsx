import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Simplicity() {
  const t = useTranslations('whoWeAre');
  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 relative">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 lg:gap-24 xl:gap-32">
          {/* Texte à gauche */}
          <div className="flex-1 w-full md:w-auto md:max-w-lg lg:max-w-xl flex flex-col justify-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-montserrat font-bold text-white mb-4 md:mb-6">
              {t('title')}
            </h1>
            <p className="text-base sm:text-lg md:text-xl font-montserrat font-medium text-white/90 leading-relaxed mb-4">
              {t('description1')}
            </p>
            <p className="text-base sm:text-lg md:text-xl font-montserrat font-medium text-white/90 leading-relaxed">
              {t('description2')}
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
