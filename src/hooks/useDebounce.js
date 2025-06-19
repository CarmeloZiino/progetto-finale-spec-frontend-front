import { useRef, useCallback } from "react";

export default function useDebounce(callback, delay) {
  let timer = useRef(null); //senza useRef questa variabile viene inizializzata ad ogni render

  return useCallback(
    /* Senza useCallback avrei una funzione instabile, 
   mentre così il valore viene ricalcolato solo se cambiano le dipendenze */
    (value) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }

      timer.current = setTimeout(() => {
        callback(value);
      }, delay);
    },
    [callback, delay]
  );
}
