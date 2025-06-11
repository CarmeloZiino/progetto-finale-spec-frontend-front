//Import Essenziali
import { useRef } from "react";
//Hooks
import useDebounce from "../hooks/useDebounce";
//Context
import { useGlobalContext } from "../context/GlobalContext";
//icon
import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
  // const [inputValue, setInputValue] = useState("");

  const inputRef = useRef();

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
        ref={inputRef}
        className="form-control me-2"
        type="search"
        placeholder="Roby Marton 55"
        aria-label="Search"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
      <FaSearch style={{ color: "var(--brand-dark-brown)" , fontSize: "1.2rem" }} />
    </form>
  );
}
