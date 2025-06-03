//Type
import type { Product } from "../types/ProductTypes";
//React ICON
import { GiHeartBottle } from "react-icons/gi";
//HOOK
import { useWishlist } from "../context/WishlistContext";

export default function ProductRow({
  id,
  title,
  origin,
  typology,
  image,
}: Product) {
  //Funzioni dalla wishlist
  const { addToWishlist, isInWishlist } = useWishlist();

  // Verifica se il prodotto è già nella wishlist
  const isProductInWishlist = isInWishlist(id);

  const handleAddToWishlist = () => {
    const productToAdd = {
      id,
      title,
      origin,
      typology,
      image,
      // Aggiungi altri campi necessari
    };
    addToWishlist(productToAdd);
  };

  return (
    <div className="book d-flex flex-column" key={id}>
      <span>Provenienza:</span> <p>{origin}</p>
      <span>Metodo:</span>
      <p>{typology}</p>
      <GiHeartBottle
        id="wishIcon"
        style={{
          fontSize: "25px",
          position: "relative",
          left: "100px",
          top: "40px",
          color: isProductInWishlist ? "red" : "black",
          transition: "color 0.3s ease",
        }}
        onClick={handleAddToWishlist}
      />
      <div className="cover d-flex flex-column">
        <img src={`/gin/${image}`} />
        <p className="m-0">{title}</p>
      </div>
    </div>
  );
}
