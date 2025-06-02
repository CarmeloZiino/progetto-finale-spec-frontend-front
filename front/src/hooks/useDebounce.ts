import { useRef, useCallback } from "react";

export default function useDebounce(callback: (value: string) => void, delay: number) {
  let timer = useRef<ReturnType<typeof setTimeout> | null>(null); 
  /* ReturnType è una figata! Si adatta perfettamente al tipo che gli viene assegnato.
  In combinazione con 'typeof setTimeout', non sapendo di preciso cosa potesse restituire timer,
  gli sto chiedendo di adattarsi perfettamente al type di setTimeout, qualunque cosa sia.

  A differenza di Any mantiene il tipo.
  A differenza di unknown, che farà controlli sul tipo, lui sa già esattamente cos'è!
  
  */
  return useCallback(
    (value: string) => {
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
