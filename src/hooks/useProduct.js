//IMPORT REACT
import { useState, useEffect, useCallback } from "react";
//URL CHIAMATA API
const url = import.meta.env.VITE_API_URL;

export default function useProduct() {
  //GESTIONE STATO PRODOTTI
  const [products, setProduct] = useState([]);
  const [singleProduct, setSingleProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const call = await fetch(`${url}/products`);
        const resCall = await call.json();
        setProduct(resCall);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error("Errore sconosciuto", error);
        }
      }
    };
    fetchProduct();
  }, []);

  //Recupero singola Card - Ottimizzato con useCallback
  const fetchSingleProduct = useCallback(async (id) => {
    try {
      const response = await fetch(`${url}/products/${id}`);

      // Se la response non è ok, allora da errore
      if (!response.ok) {
        throw new Error(`Errore HTTP: ${response.status}`);
      }

      // Se è ok restituisce il Prodotto
      const data = await response.json();
      setSingleProduct(data);
    } catch (err) {
      console.error("Errore nel recupero del gin:", err);
      setSingleProduct(null); // Imposta esplicitamente a null
    }
  }, []);

  const dataProducts = { products, fetchSingleProduct, singleProduct };
  return dataProducts;
}
