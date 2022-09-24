import Image from "next/image";
import { useMovieCart } from "@/context/Cart.context";

import { StarIcon} from "@/components/Icons";

type MovieCardProps = {
   id: number;
   title: string;
   release_date: string;
   poster_path: string;
   vote_average: number;
};

const MovieCard = ({
   id,
   title,
   release_date,
   poster_path,
   vote_average,
}: MovieCardProps) => {
   const { getItemQt, raiseQt, decreaseQt, removeItem } = useMovieCart();
   const quantity = getItemQt(id);

   const releaseDate = new Date(release_date);
   const price = Math.ceil(id / 12000);

   return (
      <div className="flex-0 text-center flex flex-col justify-between flex-[20%] p-2 border border-neutral-800 rounded-xl hover:border-teal-500 transition-colors ease-linear duration-75">
         <div>
            <Image
               src={`https://image.tmdb.org/t/p/original/${poster_path}`}
               alt={title}
               width={192}
               height={288}
               className="rounded-lg"
            />
         </div>
         <h2 className="text-2xl font-bold">{title}</h2>
         <p className="text-sm text-neutral-500">
            {releaseDate.toLocaleDateString("pt-BR")}
         </p>
         <div className="flex justify-around mb-2">
            <div>
               <StarIcon /> {vote_average}
            </div>
            <div>Genre</div>
         </div>
         <h2 className="text-xl mb-4">R$ {price}</h2>
         <div className="flex justify-evenly items-center">
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

export default MovieCard;
