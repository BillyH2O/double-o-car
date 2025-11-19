import Image from 'next/image'
import { SectionTitle } from '@/components/ui/text/SectionTitle'

type QRContactProps = {
  imageSrc: string
  label?: string
  title?: string
  text?: string
}

const QRContact = ({
  imageSrc,
  label = 'Contact',
  title = 'CONTACT DIRECT VIA QR CODE',
  text = 'Accédez rapidement à nos canaux de communication via QR Code. Scannez et discutez avec nous',
}: QRContactProps) => {
  return (
    <section className="mt-24 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14 py-16 flex flex-col gap-12 items-center">
      <SectionTitle label={label} title={title} text={text} darkMode={true} />
      <div className="w-full flex items-center justify-center">
        <Image
          src={imageSrc}
          alt="QR Code - Contact direct"
          width={500}
          height={500}
          className="w-[400px] h-[400px] sm:w-[540px] sm:h-[540px] md:w-[580px] md:h-[580px] rounded-xl object-contain bg-white p-4"
          priority
        />
      </div>
    </section>
  )
}

export default QRContact


