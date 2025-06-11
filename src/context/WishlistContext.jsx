//Import React
import { createContext, useState, useEffect, useContext } from "react";

//Contesto
export const WishlistContext = createContext(null);

//PROVIDER
export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [showWishlist, setShowWishlist] = useState(false);

  // Carica la wishlist dal localStorage all'avvio
  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      // Converte id in number per ogni prodotto
      const parsed = JSON.parse(savedWishlist).map((item) => ({
        ...item,
        id: parseInt(item.id),
      }));
      setWishlist(parsed);
    }
  }, []);

  // Wishlist collegata al LocalStorage
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Funzione per aggiungere un prodotto
  const addToWishlist = (product) => {
    setWishlist((prev) => {
      // Controlla se il prodotto è già nella wishlist
      if (!prev.some((item) => item.id === product.id)) {
        return [...prev, product];
      }
      return prev;
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
