import Link from "next/link";
import Image from "next/image";

import { useMovieCart } from "@/context/Cart.context";
import Search from "./Search";
import { BagIcon } from "./Icons";
import Logo from "../public/logo.png";


export default function Navbar() {
   const { openCart, cartQt } = useMovieCart();

   return (
      <header className="bg-teal-900/30 fixed top-0 w-full z-10 backdrop-blur-md py-3 px-3 lg:px-0">
         <nav className="flex flex-wrap max-w-6xl m-auto justify-between itesm-center">
            <div className="text-4xl font-bold">
               <Link href="/">
                  <a>
                     <Image src={Logo} alt="movieHub" width={171} height={25} />
                  </a>
               </Link>
            </div>
            <div className="ml-auto md:ml-0">
               <Search />
            </div>
            <div className="ml-2 md:ml-0 flex items-center gap-3">
               <button onClick={openCart} className="flex gap-2 items-center">
                  <BagIcon />
                  {cartQt > 0 ? (
                     <div className="rounded-full bg-red-600 text-white p-2 w-[24px] h-[24px] flex items-center justify-center text-xs">
                        <div>{cartQt}</div>
                     </div>
                  ) : null}
               </button>
            </div>
         </nav>
      </header>
   );
}
