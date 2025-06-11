//Import React
import { createContext, useState, useEffect, useContext } from "react";

//Contesto
export const WishlistContext = createContext(null);

//Hooks
import useStorage from "../hooks/useStorage";

//PROVIDER
export function WishlistProvider({ children }) {
  //Wishlist:
  const [wishlist, setWishlist] = useStorage("wishlist", []);
//Gestione dello stato per Visualizzare la Wishlist  
  const [showWishlist, setShowWishlist] = useState(false);

  // Funzione per aggiungere un prodotto
  const addToWishlist = (product) => {
    setWishlist((prev) => {
      // Controlla se il prodotto è già nella wishlist
      if (!prev.some((item) => item.id === product.id)) { //Se non è nella lista, lo aggiunge subito dopo quelli già inseriti
        return [...prev, product];
      }
      return prev; //Altrimenti ritorna quelli già inseriti
    });
  };

  // Funzione per rimuovere un prodotto
  const removeFromWishlist = (productId) => {
    setWishlist((prev) =>
      prev.filter((item) => Number(item.id) !== Number(productId))
    );
  };

  // Funzione per verificare se un prodotto è nella wishlist
  const isInWishlist = (productId) => {
    if (productId === undefined) return false;
    return wishlist.some((item) => Number(item.id) === Number(productId));
  };

  // Funzione per mostrare/nascondere la wishlist
  const toggleWishlist = () => {
    setShowWishlist((prev) => !prev);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        showWishlist,
        toggleWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

// Hook personalizzato per usare il context facilmente
export const useContextWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error(
      "useContextWishlist deve essere usato all'interno di un WishlistProvider"
    );
  }
  return context;
};
