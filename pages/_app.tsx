import type { AppProps } from "next/app";
import "../styles/globals.css";

import { MovieCartProvider } from "@/context/Cart.context";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function MyApp({ Component, pageProps }: AppProps) {
   return (
      <MovieCartProvider>
         <div className="flex flex-col h-screen justify-between">
         <Navbar />
         <Component {...pageProps} />
         <Footer />
         </div>
      </MovieCartProvider>
   );
}

export default MyApp;
