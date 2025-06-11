//Import React
import { useState, useMemo } from "react";
//Hooks
import useProduct from "./useProduct";

export default function useFilteredProducts() {
  const { products } = useProduct();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("default");

  const sortedProducts = useMemo(() => {
    const filteredProducts = products.filter((p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortOrder === "default") {
      //L'ordine parte da Default, quindi un po' a caso
      return filteredProducts;
    } else if (sortOrder === "cres") {
      //Così ordina da A a Z
      return [...filteredProducts].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    } else {
      //Così ordina da Z a A
      return [...filteredProducts].sort((a, b) =>
        b.title.localeCompare(a.title)
      );
    }
  }, [products, searchQuery, sortOrder]);

  return {
    sortedProducts,
    searchQuery,
    setSearchQuery,
    sortOrder,
    setSortOrder,
  };
}
