import Image from "next/image"; 

export default function Button({ width, height }: { width: number, height: number, className?: string }) {
  return (
    <Image src="/boutton retour.png" alt="Button" width={width} height={height} />
  );
}