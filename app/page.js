
import Image from "next/image";
import {io} from 'socket.io-client'
import Hero from "./components/Hero";
import Instruction from "./components/Instruction";

const socket = io("http://localhost:3002")
export default function Home() {
 return(
 <>

<Hero/>
<Instruction/>
   </>
  );
}
