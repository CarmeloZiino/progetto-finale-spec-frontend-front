
//Hooks
import useDebounce from "../hooks/useDebounce";
import useProduct from "../hooks/useProduct";
import useFilteredProducts from "../hooks/useFilteredProducts";

export default function SearchBar() {
  const { products } = useProduct();

  //Input Search
  const { setSearchQuery } = useFilteredProducts();

  const handleSearch = useDebounce((value: string) => {
    setSearchQuery(value);
  }, 300);

  return (
    <form id="searchBar" className="d-flex container">
      <input
        className="form-control me-2"
        type="search"
        placeholder="Roby Marton 55"
        aria-label="Search"
        onChange={(e) => handleSearch(e.target.value)}
      />
      <button className="btnSearch" type="submit">
        Search
      </button>
    </form>
  );
}
