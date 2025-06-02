import type { Product } from "../types/ProductTypes";

//HOOKS
// import useProduct from "../hooks/useProduct";

export default function ProductRow({
  id,
  title,
  origin,
  typology,
  image,
}: Product) {
  return (
    <div className="book d-flex flex-column" key={id}>
      <span>Provenienza:</span> <p>{origin}</p>
      <span>Metodo:</span>
      <p>{typology}</p>
      <div className="cover d-flex flex-column">
        <img src={`/gin/${image}`} />
        <p>{title}</p>
      </div>
    </div>
  );
}
