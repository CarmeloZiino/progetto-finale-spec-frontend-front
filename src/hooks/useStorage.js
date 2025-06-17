import { useState, useEffect } from "react";

export default function useStorage(itemKey, initialValue) {
  // Inizializza lo stato
  const [state, setState] = useState(() => {
    const item = localStorage.getItem(itemKey); //con getItem cerco la key
    return item ? JSON.parse(item) : initialValue; //se esiste, allora la trasformo da stringa a obj, altrimenti uso l'initialValue
  });

  // Sincronizza con localStorage quando lo stato cambia
  useEffect(() => {
    localStorage.setItem(itemKey, JSON.stringify(state)); //con setItem salvo il valore dentro il LS
  }, [state]);

  return [state, setState];
}
