import { Fragment } from "react";
import Link from "next/link";
import { Dialog, Transition } from "@headlessui/react";

import { useMovieCart } from "@/context/Cart.context";
import { Item } from "./Item";
import { CloseIcon } from "./Icons";

type CartProps = {
   isOpen: boolean;
};

const Cart = ({ isOpen }: CartProps) => {
   const { closeCart, cartItems } = useMovieCart();

   return (
      <Transition.Root show={isOpen} as={Fragment}>
         <Dialog as="div" className="relative z-10" onClose={closeCart}>
            <Transition.Child
               as={Fragment}
               enter="ease-in-out duration-500"
               enterFrom="opacity-0"
               enterTo="opacity-100"
               leave="ease-in-out duration-500"
               leaveFrom="opacity-100"
               leaveTo="opacity-0"
            >
               <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-hidden">
               <div className="absolute inset-0 overflow-hidden">
                  <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                     <Transition.Child
                        as={Fragment}
                        enter="transform transition ease-in-out duration-500 sm:duration-700"
                        enterFrom="translate-x-full"
                        enterTo="translate-x-0"
                        leave="transform transition ease-in-out duration-500 sm:duration-700"
                        leaveFrom="translate-x-0"
                        leaveTo="translate-x-full"
                     >
                        <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                           <Transition.Child
                              as={Fragment}
                              enter="ease-in-out duration-500"
                              enterFrom="opacity-0"
                              enterTo="opacity-100"
                              leave="ease-in-out duration-500"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                           >
                              <div className="absolute top-5 right-5 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
                                 <button
                                    type="button"
                                    className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                    onClick={() => closeCart()}
                                 >
                                    <span className="sr-only">
                                       Fechar carrinho
                                    </span>
                                    <CloseIcon />
                                 </button>
                              </div>
                           </Transition.Child>
                           <div className="flex h-full flex-col overflow-y-scroll bg-black py-6 shadow-xl">
                              <div className="px-4 sm:px-6">
                                 <Dialog.Title className="text-2xl font-bold text-white">
                                    Carrinho
                                 </Dialog.Title>
                              </div>
                              <div className="relative mt-6 flex-1 px-4 sm:px-6 text-neutral-300">
                                 <div className="absolute inset-0 px-4 sm:px-6 flex flex-col justify-between">
                                    <div>
                                       {cartItems.map((item) => (
                                          <Item key={item.id} {...item} />
                                       ))}
                                    </div>
                                    <div className="mt-5">
                                       <p className="text-2xl">
                                          Total:{" "}
                                          <span className="font-bold">
                                             R${" "}
                                             {cartItems.reduce(
                                                (total, cartItem) => {
                                                   const price = cartItem.id;
                                                   const subtotal = Math.ceil(
                                                      price / 12000
                                                   );
                                                   return (
                                                      total +
                                                      (subtotal || 0) *
                                                         cartItem.quantity
                                                   );
                                                },
                                                0
                                             )}
                                          </span>
                                       </p>
                                       {cartItems.length < 1 ? null : (
                                          <Link href="/checkout">
                                             <button
                                                onClick={closeCart}
                                                className="mt-3 p-2 rounded-md bg-teal-600 text-xl font-bold text-center w-full hover:bg-teal-900"
                                             >
                                                Checkout
                                             </button>
                                          </Link>
                                       )}
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </Dialog.Panel>
                     </Transition.Child>
                  </div>
               </div>
            </div>
         </Dialog>
      </Transition.Root>
   );
};

export default Cart;
