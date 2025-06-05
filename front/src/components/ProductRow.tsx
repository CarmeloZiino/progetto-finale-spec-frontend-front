//Type
import type { Product } from "../types/ProductTypes";
//React ICON
import { GiHeartBottle } from "react-icons/gi";
//HOOK
import { useContextWishlist } from "../context/WishlistContext";
//Import React
import { Link } from "react-router-dom";

export default function ProductRow({
  id,
  title,
  origin,
  typology,
  image,
}: Product) {
  //Funzioni dall'hook wishlist
  const { addToWishlist, isInWishlist } = useContextWishlist();

  // Verifica se il prodotto è già nella wishlist
  const isProductInWishlist = isInWishlist(id);
//Funzione di Aggiunta Prodotto alla Wishlist
  const handleAddToWishlist = () => {
    const productToAdd = {
      id,
      title,
      origin,
      typology,
      image,
    };
    addToWishlist(productToAdd);
  };

  return (
    <div className="book" key={id}>
      <div>
        <Link to={`/${id}`} className=" text-decoration-none text-dark">
          <span style={{ fontSize: "1.4rem" }}>Provenienza:</span>{" "}
          <p style={{ fontSize: "1.4rem" }}>{origin}</p>
          <span style={{ fontSize: "1.4rem" }}>Metodo:</span>
          <p style={{ fontSize: "1.4rem" }}>{typology}</p>
        </Link>
        <GiHeartBottle
          id="wishIcon"
          style={{
            fontSize: "25px",
            position: "relative",
            left: "140px",
            top: "15px",
            color: isProductInWishlist ? "red" : "black",
            transition: "color 0.3s ease",
          }}
          onClick={handleAddToWishlist}
        />
      </div>
      <div className="cover d-flex flex-column">
        <img src={`/gin/${image}`} />
        <p className="m-0">{title}</p>
      </div>
    </div>
  );
}
