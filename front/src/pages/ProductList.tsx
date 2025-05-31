//Import Components
import ProductRow from "../components/ProductRow";
import Carousel from "../components/Carousel";

//Import Hooks
import useProduct from "../hooks/useProduct";

export default function ProductList() {
  const { products } = useProduct();

  return (
    <>
      <Carousel/>
      <h1 className="mb-4">Top Trend </h1>
      <div className="row gap-4 justify-content-center">
        {products.map((p) => {
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
