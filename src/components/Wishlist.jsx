//Import React
import ReactDOM from "react-dom";

//Context
import { useContextWishlist } from "../context/WishlistContext";

//React Icon
import { ImCross } from "react-icons/im";
import { FaTrash } from "react-icons/fa";

//Styles
import "../style/wishlist.css";

export default function Wishlist() {
  //Importo le funzioni dal contesto
  const { wishlist, removeFromWishlist, showWishlist, toggleWishlist } =
    useContextWishlist();

  // Se la wishlist non è visibile, non renderizziamo nulla (e ci mancherebbe)
  if (!showWishlist) return null;
  // console.log("Wishlist:", wishlist);

  return ReactDOM.createPortal(
    <>
      {/* backdrop scuro */}
      <div className="wishlist-backdrop" onClick={toggleWishlist}></div>

      <div className="wishlist-overlay">
        <div className="wishlist-container">
          <div className="wishlist-header">
            <h2
              className="western-text"
              style={{
                fontSize: "2.5rem !important",
                color: "var(--brand-dark-brown)",
              }}
            >
              Preferiti
            </h2>
            <ImCross onClick={toggleWishlist} className="close-icon" />
          </div>

          {wishlist.length === 0 ? (
            <div className="wishlist-empty">
              <p>Non hai ancora aggiunto gin alla tua wishlist</p>
            </div>
          ) : (
            <div className="wishlist-items">
              {wishlist.map((product) => (
                <div key={product.id} className="wishlist-item">
                  <div className="wishlist-item-image">
                    <img
                      src={`/gin/${product.title}.jpeg`}
                      alt={product.title}
                    />
                  </div>
                  <div className="wishlist-item-info">
                    <h3>{product.title}</h3>
                    <p>{product.category}</p>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => removeFromWishlist(product.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>,
    document.body
  );
}
