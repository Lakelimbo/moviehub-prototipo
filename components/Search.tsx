import { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { SearchIcon, CloseIcon } from "./Icons";
import SearchItem from "./SearchItem";

const Search = () => {
   const [search, setSearch] = useState({});
   const [data, setData]: any = useState(null);
   const [isLoading, setLoading] = useState(false);
   let [isOpen, setIsOpen] = useState(false);
   const closeModal = () => {
      setIsOpen(false);
   };
   const openModal = () => {
      setIsOpen(true);
   };
   useEffect(() => {
      if (!search) return setSearch(".");
      fetch(
         `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.PUBLIC_TMDB_KEY}&language=pt-BR&query=${search}`
      )
         .then((res) => res.json())
         .then((data) => {
            setData(data);
            setLoading(false);
         });
   }, [search]);

   const Results = () => {
      if (isLoading) return <p>Carregando...</p>;
      if (!data) return <p>Nenhum resultado encontrado.</p>;
      return data.total_results == 0
         ? "Sem resultados."
         : data.results.map((item: any) => (
              <SearchItem key={item.id} {...item} />
           ));
   };

   return (
      <>
         <button onClick={openModal} className="relative top-2 md:hidden">
            <SearchIcon />
         </button>
         <button onClick={openModal} className="relative hidden md:block">
            <div className="text-start bg-black text-neutral-500 border-neutral-800 rounded-md p-2 w-[300px]">
               Pesquisar...
            </div>
            <div className="absolute right-2 top-2 text-neutral-500">
               <SearchIcon />
            </div>
         </button>
         <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
               <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
               >
                  <div className="fixed inset-0 bg-black bg-opacity-90" />
               </Transition.Child>

               <div className="fixed inset-0 overflow-y-auto">
                  <div className="flex min-h-full items-center justify-center p-4 text-center">
                     <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                     >
                        <Dialog.Panel className="w-full max-w-3xl transform rounded-2xl bg-neutral-900 p-6 text-left align-middle shadow-xl transition-all">
                           <button
                              onClick={closeModal}
                              className="absolute -top-3 -right-2 bg-red-900 hover:bg-red-500 rounded-full p-1"
                           >
                              <CloseIcon />
                           </button>
                           <form className="flex items-center bg-neutral-800 text-white border-neutral-700 rounded-md focus-within:ring-2 focus-within:ring-blue-700">
                              <input
                                 type="text"
                                 onChange={(e) => setSearch(e.target.value)}
                                 autoFocus={true}
                                 placeholder="Pesquise algum filme!"
                                 className="w-full bg-transparent rounded-md border-none focus:ring-0"
                              />
                              <div className="mr-2 text-neutral-500">
                                 <SearchIcon />
                              </div>
                           </form>
                           <div className="mt-3">
                              <Results />
                           </div>
                        </Dialog.Panel>
                     </Transition.Child>
                  </div>
               </div>
            </Dialog>
         </Transition>
      </>
   );
};

export default Search;
