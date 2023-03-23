import { useEffect, useState } from "react";
import Image from "next/image";

import { useMovieCart } from "@/context/Cart.context";
import { CloseIcon } from "./Icons";

import NoImage from "../public/noimage.png"

type ItemProps = {
   id: number;
   quantity: number;
};

export const Item = ({ id, quantity }: ItemProps) => {
   const [imgError, setImgError] = useState(false)
   const [data, setData]: any = useState(null);
   const [isLoading, setLoading] = useState(false);
   const { removeItem } = useMovieCart();

   useEffect(() => {
      setLoading(true);
      fetch(
         `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.PUBLIC_TMDB_KEY}&language=pt-BR`
      )
         .then((res) => res.json())
         .then((data) => {
            setData(data);
            setLoading(false);
         });
   }, [id]);

   if (isLoading) return <p>Carregando...</p>;
   if (!data) return <p>Nenhum item aqui!</p>;

   const price = Math.ceil(data.id / 12000);

   return (
    <>
      <div className="flex bg-neutral-900 rounded-lg p-2 mb-2 items-center gap-2">
         <div>
            <Image
               src={!imgError ? `https://image.tmdb.org/t/p/original/${data.backdrop_path}` : NoImage}
               onError={() => setImgError(true)}
               alt={data.title}
               width={128}
               height={72}
               className="rounded-lg"
            />
         </div>
         <div className="flex-1">
            <h1 className="text-xl font-bold">
               {data.title}{" "}
               <span className="font-normal text-neutral-500">×{quantity}</span>
            </h1>
            <div className="text-neutral-500">R$ {price}</div>
            {quantity > 1 ? (
               <div className="text-neutral-500">
                  {quantity} por{" "}
                  <span className="font-bold text-neutral-200">
                     R$ {price * quantity}
                  </span>
               </div>
            ) : null}
         </div>
         <div>
            <button onClick={() => removeItem(data.id)} className="bg-red-900 hover:bg-red-600 text-white rounded-full text-sm p-1">
               <CloseIcon />
            </button>
         </div>
      </div>
      </>
   );
};
