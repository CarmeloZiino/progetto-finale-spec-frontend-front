//Import Essenziali
import React, { createContext, useContext, useState, useMemo } from "react";
//Import Hooks
import useProduct from "../hooks/useProduct";
//Import Type
import type { Product } from "../types/ProductTypes";
import type { FilterTypology } from "../types/filterTypology";

// Tipo per il nostro contesto
type GlobalContextType = {
  // Prodotti e ricerca
  products: Product[];
  filteredProducts: Product[];

  //Imput di Ricerca
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Ordinamento
  sortOrder: "default" | "cres" | "dec";
  setSortOrder: (order: "default" | "cres" | "dec") => void;

  // Filtro per tipologia
  activeFilter: FilterTypology;
  setActiveFilter: (filter: FilterTypology) => void;
};

// Creazione del contesto
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// Props per il provider
type GlobalProviderProps = {
  children: React.ReactNode;
};

// COMPONENTE PROVIDER
export function GlobalProvider({ children }: GlobalProviderProps) {
  // Import deii prodotti dal hook esistent
  const { products } = useProduct();

  // Stati per la ricerca e l'ordinamento
  const [searchQuery, setSearchQuery] = useState(""); //Input
  const [sortOrder, setSortOrder] = useState<"default" | "cres" | "dec">(
    "default"
  ); //Order Alfabetico
  const [activeFilter, setActiveFilter] = useState<FilterTypology>("Tutti"); //Order per Metodo

  // Prodotti filtrati dall'input
  const filteredProducts = useMemo(() => {
    // Filtro i dati dall'input
    let filtered = products.filter((p) =>
      p.title
        .toLowerCase()
        .replace(/[ .-]/g, "")
        .includes(searchQuery.toLowerCase())
    );

    // Condizione per il Filtraggio
    if (activeFilter !== "Tutti") {
      filtered = filtered.filter((p) => p.typology === activeFilter);
    }

    // Condizioni per Order Alfabetico
    if (sortOrder === "default") {
      return filtered;
    } else if (sortOrder === "cres") {
      return [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    } else {
      return [...filtered].sort((a, b) => b.title.localeCompare(a.title));
    }
  }, [products, searchQuery, sortOrder, activeFilter]);

  // Valore del contesto
  const value = {
    products,
    filteredProducts,
    searchQuery,
    setSearchQuery,
    sortOrder,
    setSortOrder,
    activeFilter,
    setActiveFilter,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}

// Hook personalizzato per utilizzare il contesto
export function useGlobalContext() {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error(
      "useGlobalContext deve essere usato all'interno di un GlobalProvider"
    );
  }

  return context;
}
