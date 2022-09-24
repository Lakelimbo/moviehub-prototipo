import { useState } from "react";
import Image from "next/image";

import { useMovieCart } from "@/context/Cart.context";
import { StarIcon } from "@/components/Icons";

import NoImage from "../public/noimage.png"

type SearchItemProps = {
   id: number;
   title: string;
   release_date: string;
   backdrop_path: string;
   vote_average: number;
};

const SearchItem = ({
   id,
   title,
   release_date,
   backdrop_path,
   vote_average,
}: SearchItemProps) => {
   const [imgError, setImgError] = useState(false)
   const { getItemQt, raiseQt, decreaseQt, removeItem } = useMovieCart();
   const quantity = getItemQt(id);

   const releaseDate = new Date(release_date);
   const price = Math.ceil(id / 12000);

   return (
      <div className="bg-neutral-800 p-2 rounded-lg mb-2 transition-colors ease-linear duration-75 hover:ring-1 hover:ring-teal-500 ">
         <div className="flex flex-col text-center md:flex-row md:text-start gap-3">
            <div>
               <Image
                  src={!imgError ? `https://image.tmdb.org/t/p/original/${backdrop_path}` : NoImage}
                  onError={() => setImgError(true)}
                  alt={title}
                  width={128}
                  height={72}
                  className="rounded-lg"
               />
            </div>
            <div>
               <h2 className="text-2xl font-bold">{title}</h2>
               <p className="text-sm text-neutral-500">
                  {releaseDate.toLocaleDateString("pt-BR")}
               </p>
               <div className="flex justify-around md:justify-start gap-5 mb-3">
                  <div>
                     <StarIcon /> {vote_average}
                  </div>
                  <div>Genre</div>
                  <div>
                  <div>R$ {price}</div>
                  </div>
               </div>
            </div>
         </div>
         <div className="flex flex-col sm:flex-row gap-3 justify-evenly items-center">
            {quantity === 0 ? (
               <div>
                  <button
                     onClick={() => raiseQt(id)}
                     className="border-2 border-teal-400 text-teal-400 py-1 px-2 rounded-md hover:bg-teal-500 hover:border-teal-500 hover:text-white transition-colors ease-linear duration-75"
                  >
                     Adicionar ao carrinho
                  </button>
               </div>
            ) : (
               <>
                  <div className="flex gap-2 items-center">
                     <button
                        onClick={() => decreaseQt(id)}
                        className="flex items-center justify-center h-[24px] w-[30px] text-2xl font-bold bg-red-500 p-2 rounded-full transition-colors ease-linear duration-75"
                     >
                        <div className="mb-1">-</div>
                     </button>
                     <div>{quantity}</div>
                     <button
                        onClick={() => raiseQt(id)}
                        className="flex items-center justify-center h-[24px] w-[30px] text-2xl font-bold bg-blue-500 p-2 rounded-full transition-colors ease-linear duration-75"
                     >
                        <div className="mb-1">+</div>
                     </button>
                  </div>
                  <div>
                     <button
                        onClick={() => removeItem(id)}
                        className="border-2 border-red-400 text-red-400 py-1 px-2 rounded-md hover:bg-red-500 hover:border-red-500 hover:text-white transition-colors ease-linear duration-75"
                     >
                        Remover
                     </button>
                  </div>
               </>
            )}
         </div>
      </div>
   );
};

export default SearchItem;
