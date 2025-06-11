//Import Essenziali
import { Link } from "react-router-dom";

//Componenete Wishlist
import Wishlist from "./Wishlist";
//Hook WishList
import { useContextWishlist } from "../context/WishlistContext";

//Logo
import logo from "../assets/GintasticDue.png";

//Icon
import { GiHeartBottle } from "react-icons/gi";
import { MdCompare } from "react-icons/md";

export default function Header() {
  //Import essenziali Wishlist
  const { toggleWishlist, wishlist } = useContextWishlist();

  return (
    <>
      <header className="p-2">
        {/* VERSIONE DESKTOP - visibile solo su schermi lg e superiori */}
        <nav className="navbar navbar-expand-lg d-none d-lg-block">
          <div className="container d-flex flex-column justify-content-center align-items-center gap-2">
            {/* LOGO CENTRATO */}
            <Link
              className="navbar-brand d-flex justify-content-center align-items-center mb-2"
              to="/"
            >
              <img
                src={logo}
                width={200}
                className="rounded-3"
                alt="LOGO"
                id="logo"
              />
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
                    <GiHeartBottle
                      className="icon"
                      style={{ fontSize: "2rem" }}
                    />
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
                  to="/compare"
                >
                  <MdCompare className="icon" style={{ fontSize: "2rem" }} />
                  <p>Compare</p>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* VERSIONE MOBILE - visibile solo su schermi inferiori a lg */}
        <div className="container d-lg-none d-flex justify-content-center align-items-center h-100">
          {/* Menu mobile in colonna senza testo */}
          <div className="d-flex align-items-center justify-items-center gap-3 mt-2">
            {/*COMPARE - solo icona */}
            <div>
              <Link
                to="/compare"
                className="navBtnLink d-flex justify-content-center align-items-center"
              >
                <MdCompare className="icon" style={{ fontSize: "2.8rem" }} />
              </Link>
            </div>
            {/* LOGO più piccolo */}
            <Link to="/" className="">
              <img
                src={logo}
                width={140}
                className="rounded-3"
                alt="LOGO"
                id="logo"
              />
            </Link>
            {/* WISHLIST - solo icona */}
            <div>
              <a
                className="navBtnLink d-flex justify-content-center align-items-center"
                onClick={toggleWishlist}
                style={{ cursor: "pointer" }}
              >
                <div className="position-relative">
                  <GiHeartBottle
                    className="icon"
                    style={{ fontSize: "3rem" }}
                  />
                  {wishlist.length > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {wishlist.length}
                    </span>
                  )}
                </div>
              </a>
            </div>
          </div>
        </div>
      </header>
      {/* WishList */}
      <Wishlist />
    </>
  );
}
