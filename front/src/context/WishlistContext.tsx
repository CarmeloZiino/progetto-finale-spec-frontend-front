//Type
import type { Product } from "../types/ProductTypes";
import type { ReactNode } from "react";
//Import React
import { createContext, useState, useEffect, useContext } from "react";

//Type con tutte le info e funzioni disponibili
type WishlistContextType = {
  wishlist: Product[]; //Arrya che contiene i Gin aggiunti alla WishList
  addToWishlist: (product: Product) => void; //Funzione che aggiunge il gin alla WishList
  removeFromWishlist: (productId: string | number) => void; //Funzione che rimuove il gin alla WishList
  isInWishlist: (productId: string | number | undefined) => boolean; //Funzione che verifica se il gin è già nella wishlist
  showWishlist: boolean; //Booleano er indicare se la wishlist è visibile o meno
  toggleWishlist: () => void; //È una funzione che cambia lo stato di visibilità della wishlist
};

//Contesto
export const WishlistContext = createContext<WishlistContextType | null>(null);

//PROVIDER
export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [showWishlist, setShowWishlist] = useState(false);

  // Carica la wishlist dal localStorage all'avvio
  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  // Wishlist collegata al LocalStorage
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Funzione per aggiungere un prodotto
  const addToWishlist = (product: Product) => {
    setWishlist((prev) => {
      // Controlla se il prodotto è già nella wishlist
      if (!prev.some((item) => item.id === product.id)) {
        return [...prev, product];
      }
      return prev;
    });
  };

  // Funzione per rimuovere un prodotto
  const removeFromWishlist = (productId: string | number) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
  };

  // Funzione per verificare se un prodotto è nella wishlist
  const isInWishlist = (productId: string | number | undefined) => {
    return wishlist.some((item) => item.id === productId);
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
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error(
      "useWishlist deve essere usato all'interno di un WishlistProvider"
    );
  }
  return context;
};
