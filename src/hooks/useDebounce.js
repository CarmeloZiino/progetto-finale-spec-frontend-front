import { useRef, useCallback } from "react";

export default function useDebounce(callback, delay) {
  let timer = useRef(null);
  /* Il commento originale sul ReturnType è stato rimosso 
     poiché era specifico di TypeScript */

  return useCallback(
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
