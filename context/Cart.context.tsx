import { createContext, ReactNode, useContext, useState } from "react";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import Cart from "@/components/Cart";

type MovieCartProviderProps = {
   children: ReactNode;
};

type CartContext = {
   cartQt: number;
   getItemQt: (id: number) => number;
   raiseQt: (id: number) => void;
   decreaseQt: (id: number) => void;
   removeItem: (id: number) => void;
   openCart: () => void;
   closeCart: () => void;
   cartItems: CartItem[];
};

type CartItem = {
   id: number;
   quantity: number;
};

const CartContext = createContext({} as CartContext);

export const useMovieCart = () => {
   return useContext(CartContext);
};

export const MovieCartProvider = ({ children }: MovieCartProviderProps) => {
   const [isOpen, setOpen] = useState(false);
   const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("cart", []);

   const openCart = () => setOpen(true);
   const closeCart = () => setOpen(false);

   const getItemQt = (id: number) => {
      return cartItems.find((item) => item.id === id)?.quantity || 0;
   };
   const raiseQt = (id: number) => {
      setCartItems((currentItems) => {
         if (currentItems.find((item) => item.id === id) == null) {
            return [...currentItems, { id, quantity: 1 }];
         } else {
            return currentItems.map((item) => {
               if (item.id === id) {
                  return { ...item, quantity: item.quantity + 1 };
               } else {
                  return item;
               }
            });
         }
      });
   };
   const decreaseQt = (id: number) => {
      setCartItems((currentItems) => {
         if (currentItems.find((item) => item.id === id)?.quantity === 1) {
            return currentItems.filter((item) => item.id !== id);
         } else {
            return currentItems.map((item) => {
               if (item.id === id) {
                  return { ...item, quantity: item.quantity - 1 };
               } else {
                  return item;
               }
            });
         }
      });
   };
   const removeItem = (id: number) => {
      setCartItems((currentItems) => {
         return currentItems.filter((item) => item.id !== id);
      });
   };

   const cartQt = cartItems.reduce(
      (quantity, item) => item.quantity + quantity,
      0
   );

   return (
      <CartContext.Provider
         value={{
            getItemQt,
            raiseQt,
            decreaseQt,
            removeItem,
            cartItems,
            cartQt,
            openCart,
            closeCart
         }}
      >
         {children}
         <Cart isOpen={isOpen} />
      </CartContext.Provider>
   );
};
