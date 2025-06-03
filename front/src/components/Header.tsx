//Import Essenziali
import { Link } from "react-router-dom";

//Componenete Wishlist
import Wishlist from "./Wishlist";
//Hook WishList
import { useWishlist } from "../context/WishlistContext";

//Logo
import logo from "../assets/GintasticDue.png";

//Icon
import { GiHeartBottle } from "react-icons/gi";
import { MdCompare } from "react-icons/md";

export default function Header() {
  //Import essenziali Wishlist
  const { toggleWishlist, wishlist } = useWishlist();

  return (
    <>
      <header className="p-2">
        {/* VERSIONE DESKTOP - visibile solo su schermi lg e superiori */}
        <nav className="navbar navbar-expand-lg d-none d-lg-block">
          <div className="container d-flex flex-column justify-content-center align-items-center gap-2">
            {/* LOGO CENTRATO */}
            <Link className="navbar-brand d-flex justify-content-center align-items-center mb-2" to="/">
              <img src={logo} width={115} className="rounded-3" alt="LOGO" />
            </Link>

            {/* Menu desktop sotto il logo */}
            <div className="navIcon d-flex gap-4 mt-2 px-3">
              {/* WISHLIST */}
              <div>
                <a
                  className="navBtnLink d-flex flex-column justify-content-center align-items-center"
                  onClick={toggleWishlist}
                  style={{ cursor: "pointer" }}
                >
                  <div className="position-relative">
                    <GiHeartBottle className="icon" />
                    {wishlist.length > 0 && (
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {wishlist.length}
                      </span>
                    )}
                  </div>
                  <p>Wishlist</p>
                </a>
              </div>
              {/*COMPARE */}
              <div>
                <Link
                  className="navBtnLink d-flex flex-column justify-content-center align-items-center"
                  to=""
                >
                  <MdCompare className="icon" />
                  <p>Compare</p>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* VERSIONE MOBILE - visibile solo su schermi inferiori a lg */}
        <nav className="navbar d-block d-lg-none">
          <div className="container-fluid d-flex flex-column justify-contente-center align-items-end">
            {/* LOGO più piccolo */}
            <Link to="/" className="">
              <img src={logo} width={38} className="rounded-3" alt="LOGO" />
            </Link>

            {/* Menu mobile in colonna senza testo */}
            <div className="navbar-icon d-flex flex-column gap-3 mt-2">
              {/* WISHLIST - solo icona */}
              <div>
                <a
                  className="navBtnLink d-flex justify-content-center align-items-center"
                  onClick={toggleWishlist}
                  style={{ cursor: "pointer" }}
                >
                  <div className="position-relative">
                    <GiHeartBottle className="icon" />
                    {wishlist.length > 0 && (
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {wishlist.length}
                      </span>
                    )}
                  </div>
                </a>
              </div>
              {/*COMPARE - solo icona */}
              <div>
                <Link
                  to=""
                  className="navBtnLink d-flex justify-content-center align-items-center"
                >
                  <MdCompare className="icon" />
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </header>
      {/* WishList */}
      <Wishlist />
    </>
  );
}
