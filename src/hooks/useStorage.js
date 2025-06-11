import { useState, useEffect } from "react";

export default function useStorage(itemKey, initialValue) {
  // Inizializza lo stato
  const [state, setState] = useState(() => {
    const item = localStorage.getItem(itemKey);
    return item ? JSON.parse(item) : initialValue;
  });

  // Sincronizza con localStorage quando lo stato cambia
  useEffect(() => {
    localStorage.setItem(itemKey, JSON.stringify(state));
  }, [itemKey, state]);

  return [state, setState];
}
