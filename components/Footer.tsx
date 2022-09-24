import Link from "next/link";

const Footer = () => {
   return (
      <footer className="w-full mt-10 bg-teal-800 text-center">
         <ul className="max-w-6xl m-auto flex justify-around py-3">
            <li>
               <Link href="/docs">Documentação</Link>
            </li>
            <li>
               <Link href="#">GitHub</Link>
            </li>
            <li>
               <Link href="#">Voltar ao topo</Link>
            </li>
         </ul>
         <div className="bg-black/80 py-5">
            © 2022 - Frangolino Corporation.
         </div>
      </footer>
   );
};

export default Footer;
