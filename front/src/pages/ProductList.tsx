//Import Components
import ProductRow from "../components/ProductRow";
import Carousel from "../components/Carousel";
import SearchBar from "../components/SearchBar";

//Import Hooks
import useFilteredProducts from "../hooks/useFilteredProducts";

//Import Icon react
import { FaSortAlphaDownAlt } from "react-icons/fa";
import { FaSortAlphaDown } from "react-icons/fa";

export default function ProductList() {
  const { sortedProducts ,sortOrder, setSortOrder  } = useFilteredProducts();

    const handleSortClick = () => {
    if (sortOrder === "default" || sortOrder === "dec") {
      setSortOrder("cres");
    } else {
      setSortOrder("dec");
    }
  };
  return (
    <>
      <SearchBar />
      <Carousel />
      <div className="mb-4 d-flex align-items-center justify-content-between">
        <h1 className="mb">i nostri gin</h1>
        {sortOrder === "default" || sortOrder === "dec" ? (
          <FaSortAlphaDown
            onClick={handleSortClick}
            style={{ cursor: "pointer" , fontSize: "18pt" }}
          />
        ) : (
          <FaSortAlphaDownAlt
            onClick={handleSortClick}
            style={{ cursor: "pointer" , fontSize: "18pt" }}
          />
        )}
      </div>
      <div className="row gap-4 justify-content-center">
        {sortedProducts.map((p) => {
          return (
            <ProductRow
              title={p.title}
              category={p.category}
              origin={p.origin}
              typology={p.typology}
              image={p.image}
            />
          );
        })}
      </div>
    </>
  );
}
