import CarLogo from '../components/CarLogo';
import Form from '@/components/Form';
import './globals.css';
import { Monserrat } from '@/components/Monserrat';
import Logo from '@/components/Logo';

const monserrat = Monserrat;


export default function Page() {
  return (
    <div className={`bg-black h-screen flex flex-col items-center gap-10 ${monserrat.className}`}> 
      <Logo width={100} height={100} />
      <div className={`${monserrat.className} flex flex-col items-center font-normal text-[30px] leading-[30px] tracking-[0.05em]`}> 
        <p className="text-white">Prenez la route,</p>
        <span className="text-white/50">On s'occupe du reste.</span>
      </div>


      <div className={`${monserrat.className} flex flex-col items-center font-normal text-[20px] leading-[15px] tracking-[-0.01em]`}>
        <p className="text-white/50">Nos véhicules</p>
      </div>


        <div className="h-[35px] flex items-center justify-center">
          <div className="flex items-center justify-between gap-3">
            <CarLogo src="/renalut.png" alt="Renault" width={20} height={20} text="Renault" />
            <CarLogo src="/dacia.png" alt="Dacia" width={20} height={20} text="Dacia" />
            <CarLogo src="/peugeot-modified.png" alt="Peugeot" width={20} height={20} text="Peugeot" />
            <CarLogo src="/hiyundai.png" alt="Hiyundai" width={20} height={20} text="Hiyundai" />
          </div>
        </div>
      <Form />
      <p>Vous avez déja une reservation ?</p>

    </div>
  );
}