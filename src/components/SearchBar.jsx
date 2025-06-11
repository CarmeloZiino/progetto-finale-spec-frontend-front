import { useState } from "react";

//Hooks
import useDebounce from "../hooks/useDebounce";

//Context
import { useGlobalContext } from "../context/GlobalContext";

export default function SearchBar() {
  const [inputValue, setInputValue] = useState("");

  //Input Variabile di Stato Ricerca
  const { setSearchQuery } = useGlobalContext();

  const handleSearch = useDebounce((value) => {
    const valueClean = value.replace(/[ .-]/g, "");
    setSearchQuery(valueClean);
  }, 500);

  return (
    <form
      id="searchBar"
      className="d-flex container"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        className="form-control me-2"
        type="search"
        placeholder="Roby Marton 55"
        aria-label="Search"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          handleSearch(e.target.value);
        }}
      />
    </form>
  );
}
