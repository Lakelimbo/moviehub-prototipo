import type { InferGetServerSidePropsType, GetServerSideProps, NextPage } from "next";
import Head from "next/head";

import LayoutWrapper from "@/components/LayoutWrapper";
import MovieCard from "@/components/MovieCard";

import Logo from "../public/logo.png";
import Image from "next/image";

export const getServerSideProps: GetServerSideProps = async (context) => {
   const res = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=30afd74ebda9dffa281b3b9016b4aa3c&language=pt-BR&page=1');
   const data = await res.json();

   return {
      props: { data },
   };
};

const Home: NextPage = ({
   data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
   return (
      <>
         <div className="overflow-x-hidden hue-anim after:content-[''] after:absolute after:top-0 after:left-0 after:-z-10 after:w-screen after:h-screen after:bg-gradient-to-b after:from-[#072826] after:to-transparent" />
         <LayoutWrapper>
            <Head>
               <title>movieHub - O lar dos filmes</title>
            </Head>

            <div className="text-center mb-5 h-[70vh] flex flex-col justify-center">
               <div>
                  <Image src={Logo} alt="movieHub" />
               </div>
               <p className="mt-3 text-xl">
                  Bem-vindo(a) ao{" "}
                  <span className="text-teal-300 span-anim">movieHub!</span>
                  <br />
                  Escolha seu filme e faça uma compra rapidamente com um dos
                  maiores catálogos de filmes do mundo.
               </p>
            </div>
            <h1 className="text-4xl font-bold mb-3">Populares no momento</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
               {data.results.map((item: any) => (
                  <MovieCard key={item.id} {...item} />
               ))}
            </div>
         </LayoutWrapper>
      </>
   );
};

export default Home;
