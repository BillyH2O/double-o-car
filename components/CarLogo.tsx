import Image from 'next/image';
import { Monserrat } from './Monserrat';

interface CarLogoProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  text: string;
}

export default function CarLogo({ src, alt, width, height, text }: CarLogoProps) {
  const monserrat = Monserrat;
  return (
    <div className="flex items-center gap-2 bg-black/50 p-4 rounded-full h-[35px]">
    <Image src={src} alt={alt} width={width} height={height} />
    <p className={`${monserrat.className} text-white`}>{text}</p>
    </div>
  );
}
