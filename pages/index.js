import { Inter } from "next/font/google";
import Link from "next/link";
const inter = Inter({ subsets: ["latin"] });
import Calculator from "@/components/Calculator";

export default function Home() {
  return (
    <>
    {/* <Calculator/> */}
    <div className="flex flex-col justify-center items-start m-2 px-2 gap-3">

    
        <Link className={'link'} href='/page/reinvest'>Money Regular </Link>
        <Link className={'link'} href='/page/reinvest-emi'>Money After EMI</Link>
        <Link className={'link'} href='/page/stockaverage'>Stock Average</Link>
        <Link className={'link'} href='/page/sipcalculation'>SIP Calculations</Link>
        <Link className={'link'} href='/page/interestcalculations'>Interest Calculations</Link>
        <Link className={'link'} href='/page/agecalculator'>Age calculation</Link>
        <Link className={'link'} href='/page/sipcalculator'>SIP (Systematic Investment Plan)</Link>
        <Link className={'link'} href='/page/emicalculator'>EMI(Home/Car/Persoan Load)</Link>  
        <Link className={'link'} href='/page/timezone'>Time Zone</Link>
    </div>
 
      </>
  );
}
