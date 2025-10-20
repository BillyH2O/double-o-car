import Image from 'next/image';

export default function Logo({ width, height }: { width: number, height: number }) {
  return (
    <Image src="/logo.png" alt="Logo" width={width} height={height} className="m-10" />
  );
}