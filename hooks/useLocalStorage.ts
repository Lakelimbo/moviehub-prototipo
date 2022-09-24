import React, { useEffect, useState, useRef } from "react";

export const useLocalStorage = <T>(
   key: string,
   initialState?: T | (() => T)
): [T, React.Dispatch<React.SetStateAction<T>>] => {
   const initialRender = useRef(true)

   const [state, setState] = useState<T>(initialState as T);

   useEffect(() => {
      const item = localStorage.getItem(key);
      if (item) return setState(parse(item));
   }, [key]);

   useEffect(() => {
      if (initialRender.current) {
         initialRender.current = false;
         return;
      }
      localStorage.setItem(key, JSON.stringify(state));
   }, [key, state]);

   return [state, setState] as [typeof state, typeof setState];
};

const parse = (value: string) => {
   try {
      return JSON.parse(value);
   } catch {
      return value;
   }
};
