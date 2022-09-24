import { useRef, useState, Fragment } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { IMaskInput } from "react-imask";
import { Listbox, Dialog, Transition } from "@headlessui/react";
import { MaskElement } from "imask";

import LayoutWrapper from "@/components/LayoutWrapper";
import { useMovieCart } from "@/context/Cart.context";
import { Chevron, CheckIcon } from "@/components/Icons";
import { Item } from "@/components/Item";

const Dropdown = () => {
   const estado = [
      { name: "Acre" },
      { name: "Alagoas" },
      { name: "Amapá" },
      { name: "Amazonas" },
      { name: "Bahia" },
      { name: "Ceará" },
      { name: "Distrito Federal" },
      { name: "Espírito Santo" },
      { name: "Goiás" },
      { name: "Maranhão" },
      { name: "Mato Grosso" },
      { name: "Mato Grosso do Sul" },
      { name: "Minas Gerais" },
      { name: "Pará" },
      { name: "Paraíba" },
      { name: "Paraná" },
      { name: "Pernambuco" },
      { name: "Piauí" },
      { name: "Rio de Janeiro" },
      { name: "Rio Grande do Norte" },
      { name: "Rio Grande do Sul" },
      { name: "Rondônia" },
      { name: "Santa Catarina" },
      { name: "São Paulo" },
      { name: "Sergipe" },
      { name: "Tocantins" },
   ];
   const [selected, setSelected] = useState(estado[0]);
   return (
      <Listbox value={selected} onChange={setSelected}>
         <div className="relative w-full">
            <Listbox.Button className="relative flex items-center justify-center h-[40px] w-full bg-neutral-900 text-white ring-1 ring-neutral-800 rounded-md">
               <span className="block truncate">{selected.name}</span>
               <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <Chevron aria-hidden="true" />
               </span>
            </Listbox.Button>
            <Transition
               as={Fragment}
               leave="transition ease-in duration-100"
               leaveFrom="opacity-100"
               leaveTo="opacity-0"
            >
               <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-neutral-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {estado.map((estado, estadoId) => (
                     <Listbox.Option
                        key={estadoId}
                        className={({ active }) =>
                           `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active ? "bg-teal-900" : "text-white"
                           }`
                        }
                        value={estado}
                     >
                        {({ selected }) => (
                           <>
                              <span
                                 className={`block truncate ${
                                    selected ? "font-medium" : "font-normal"
                                 }`}
                              >
                                 {estado.name}
                              </span>
                              {selected ? (
                                 <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-teal-500">
                                    <CheckIcon aria-hidden="true" />
                                 </span>
                              ) : null}
                           </>
                        )}
                     </Listbox.Option>
                  ))}
               </Listbox.Options>
            </Transition>
         </div>
      </Listbox>
   );
};

const Forms = () => {
   let [isOpen, setIsOpen] = useState(false);
   const router = useRouter();
   const closeModal = async () => {
      localStorage.clear();
      await router.push("/");
      router.reload();
   };
   const openModal = (e: any) => {
      e.preventDefault();
      setIsOpen(true);
   };

   const Modal = () => {
      return (
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
                        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-neutral-900 p-6 text-left align-middle shadow-xl transition-all">
                           <Dialog.Title
                              as="h3"
                              className="text-center text-2xl font-bold leading-6 text-white"
                           >
                              Obrigado(a)!
                           </Dialog.Title>
                           <div className="mt-3">
                              <p className="text-gray-300">
                                 O pagamento foi concluído! Seus itens e seu
                                 recibo serão enviados ao seu e-mail em até 6
                                 horas.
                                 <br />
                                 Verifique se o e-mail também caiu em sua caixa
                                 de spam/lixo eletrônico.
                              </p>
                           </div>

                           <div className="mt-4">
                              <button
                                 onClick={closeModal}
                                 className="mt-3 p-2 rounded-md bg-teal-600 text-xl font-bold text-center w-full hover:bg-teal-900"
                              >
                                 OK
                              </button>
                           </div>
                        </Dialog.Panel>
                     </Transition.Child>
                  </div>
               </div>
            </Dialog>
         </Transition>
      );
   };

   // Durante uma atualização da dep. de máscara, alguma coisa no código do plugin
   // mudou e o typecheck tá meio maluco, mostrando como erro.
   // Pelo visto já tem fix sendo trabalhado.
   const ref = useRef<MaskElement>(null);
   const inputRef = useRef<MaskElement>(null);
   return (
      <form onSubmit={openModal} method="post" className="flex flex-col gap-3">
         <div>
            <input
               type="text"
               placeholder="Nome completo"
               minLength={5}
               required
               className="w-full bg-neutral-900 text-white border-neutral-800 rounded-md"
            />
         </div>
         <div className="flex flex-col sm:flex-row gap-2">
            <IMaskInput
               type="text"
               placeholder="CPF"
               mask="000.000.000-00"
               ref={ref}
               inputRef={inputRef}
               minLength={8}
               required
               className="w-full bg-neutral-900 text-white border-neutral-800 rounded-md"
            />
            <IMaskInput
               type="tel"
               placeholder="Celular (com DDD)"
               mask="(00) 00000-0000"
               ref={ref}
               inputRef={inputRef}
               minLength={8}
               required
               className="w-full bg-neutral-900 text-white border-neutral-800 rounded-md"
            />
         </div>
         <div>
            <input
               type="email"
               placeholder="E-mail"
               required
               className="w-full bg-neutral-900 text-white border-neutral-800 rounded-md"
            />
         </div>
         <div className="flex flex-col sm:flex-row gap-2">
            <IMaskInput
               type="text"
               placeholder="CEP"
               mask="00000-000"
               ref={ref}
               inputRef={inputRef}
               minLength={8}
               required
               className="w-full bg-neutral-900 text-white border-neutral-800 rounded-md"
            />
            <input
               type="text"
               placeholder="Endereço"
               minLength={5}
               required
               className="w-full bg-neutral-900 text-white border-neutral-800 rounded-md"
            />
         </div>
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <input
               type="text"
               placeholder="Cidade"
               minLength={3}
               className="mb-1 w-full bg-neutral-900 text-white border-neutral-800 rounded-md"
            />
            <Dropdown />
         </div>
         <button
            type="submit"
            className="mt-3 p-2 rounded-md bg-teal-600 text-xl font-bold text-center w-full hover:bg-teal-900"
         >
            Finalizar compra
         </button>
         <Modal />
      </form>
   );
};

const List = () => {
   const { cartItems } = useMovieCart();

   return (
      <div>
         {cartItems.map((item) => (
            <Item key={item.id} {...item} />
         ))}
      </div>
   );
};

const Checkout = () => {
   const { cartItems } = useMovieCart();
   return (
      <LayoutWrapper>
         <Head>
            <title>Checkout - movieHub</title>
         </Head>
         {cartItems.length < 1 ? (
            <h1 className="text-3xl font-bold text-center mt-64">
               O carrinho está vazio!
            </h1>
         ) : (
            <div className="grid lg:grid-cols-2 gap-2">
               <div>
                  <h1 className="text-2xl mb-5 font-bold">
                     Sua lista{" "}
                     <span className="font-normal text-neutral-500">
                        ({cartItems.length}{" "}
                        {cartItems.length > 1 ? "filmes" : "filme"})
                     </span>
                  </h1>
                  <List />
                  <h1 className="text-3xl mt-5">
                     Total de R${" "}
                     {cartItems.reduce((total, cartItem) => {
                        const price = cartItem.id;
                        const subtotal = Math.ceil(price / 12000);
                        return total + (subtotal || 0) * cartItem.quantity;
                     }, 0)}
                  </h1>
               </div>
               <div>
                  <h1 className="text-2xl mb-5 font-bold">
                     Dados para pagamento
                  </h1>
                  <Forms />
               </div>
            </div>
         )}
      </LayoutWrapper>
   );
};

export default Checkout;
