//ICON
import { GiHeartBottle } from "react-icons/gi";

//Import React
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";

//Hooks
import useProduct from "../hooks/useProduct";
import { useContextWishlist } from "../context/WishlistContext";

export default function DetailsPage() {
  const { id } = useParams();
  //Import dall'Hook
  const { fetchSingleProduct, singleProduct } = useProduct();
  //Per recuperare i dati dal Back-end
  useEffect(() => {
    if (id) {
      fetchSingleProduct(id);
    }
  }, [id]);

  //Funzioni dalla wishlist
  const { addToWishlist, isInWishlist, removeFromWishlist } =
    useContextWishlist();

  //Funzione supporto aggiunta wishlist
  const handleAddToWishlist = () => {
    if (!singleProduct || !singleProduct.product) {
      return <div>Caricamento in corso...</div>;
    }

    const productToAdd = {
      id: singleProduct.product.id,
      title: singleProduct.product.title,
      origin: singleProduct.product.origin,
      category: singleProduct?.product.category,
      image: singleProduct?.product.image,
    };
    addToWishlist(productToAdd);
  };

  //NOTA: Bisogna ribadire la condizione prima del return, altrimenti non reinderizza correttamente
  if (!singleProduct || !singleProduct.product) {
    return <div>Caricamento in corso...</div>;
  }

  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <h1 className="titleDetails text-center text-md-start mb-3 western-text">
          {singleProduct.product.title}
        </h1>
        {/* WishIcon */}
        <GiHeartBottle
          id="wishIcon"
          style={{
            fontSize: "25px",
            color: isInWishlist(singleProduct.product.id) ? "red" : "black",
          }}
          onClick={() => {
            if (isInWishlist(singleProduct.product.id)) {
              removeFromWishlist(singleProduct.product.id);
            } else {
              handleAddToWishlist();
            }
          }}
        />
      </div>
      <div
        className="cardDetails d-flex flex-column flex-md-row gap-3 justify-content-center align-items-stretch"
        key={singleProduct.product.id}
      >
        <div className="mb-4 mb-md-0 col-12 col-md-6 d-flex align-items-center justify-content-center">
          <img
            src={`/gin/${singleProduct.product.title}.jpg`}
            alt={singleProduct.product.title}
            style={{
              width: "100%",
              maxWidth: "400px",
              borderRadius: "10pt",
              boxShadow: "var(--shadow-medium)",
            }}
          />
        </div>
        <div className="infoDetails col-12 col-md-6 d-flex flex-column justify-content-center py-3 py-md-4">
          <div className="row g-2 mb-2">
            <div className="col-12 col-md-6">
              <p className="details mb-0">
                Provenienza: <strong> {singleProduct.product.origin}</strong>
              </p>
            </div>
          </div>

          <p className="details mb-2">
            Gusto e Aromi: <strong>{singleProduct.product.taste}</strong>
          </p>

          <p className="details mb-2">
            Metodo di distillazione:
            <strong> {singleProduct.product.category}</strong>
          </p>

          <div className="row g-2">
            <div className="col-12 col-md-6">
              <p className="details mb-0">
                Grado Alcolemico:
                <strong> {singleProduct.product.alcolContent}%</strong>
              </p>
            </div>
            <div className="col-12 col-md-6">
              <p className="details mb-0">
                Formato: <strong>{singleProduct.product.format}</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Link className="compareText mt-3" to="/compare">
        CONFRONTA GIN
      </Link>
    </>
  );
}
