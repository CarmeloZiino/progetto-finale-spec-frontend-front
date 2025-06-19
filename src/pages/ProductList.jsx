//Import React
import { useState, useEffect } from "react";

//Import Components
import ProductRow from "../components/ProductRow";
import Carousel from "../components/Carousel";
import SearchBar from "../components/SearchBar";

//Import Context
import { useGlobalContext } from "../context/GlobalContext";

//Import Icon react
import { FaSortAlphaDownAlt } from "react-icons/fa";
import { FaSortAlphaDown } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";

export default function ProductList() {
  //IMPORT DAL GLOBALCONTEXT
  const {
    filteredProducts,
    sortOrder,
    setSortOrder,
    activeFilter,
    setActiveFilter,
  } = useGlobalContext();

  //State per la visibilità del Menù di Filtraggio
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  // Opzioni di filtro basate sulle tipologie di gin
  const filterOptions = [
    "Tutti",
    "London Dry Gin",
    "Dry Gin",
    "Distilled Gin",
    "Italian Dry Gin",
    "Compound Gin",
    "Old Tom Gin",
    "Navy Strength Gin",
    "Cold Distilled Gin",
  ];

  // Gestisce i click fuori dal menu per chiuderlo
  useEffect(() => {
    // Funzione per chiudere il menu quando si clicca altrove
    function handleGlobalClick() {
      // Se il menu è aperto, chiudilo
      if (showFilterMenu) {
        setShowFilterMenu(false);
      }
    }

    // Se il menù è aperto:
    if (showFilterMenu) {
      // Breve timeout per evitare che l'evento di click che apre il menu lo chiuda immediatamente (e che crashi la pagina)
      const timeoutId = setTimeout(() => {
        document.addEventListener("click", handleGlobalClick);
      }, 100);

      // Pulizia
      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener("click", handleGlobalClick);
      };
    }
  }, [showFilterMenu]);

  //Funzione supporto per ordinare
  const handleSortClick = () => {
    if (sortOrder === "default" || sortOrder === "dec") {
      setSortOrder("cres");
    } else {
      setSortOrder("dec");
    }
  };

  // Funzione per aprire il menù a tendina
  const handleFilterClick = () => {
    setShowFilterMenu(!showFilterMenu);
  };

  // Funzione per il click sulle opzioni del menu
  const handleFilterSelect = (option) => {
    setActiveFilter(option);
    setShowFilterMenu(false);
  };

  return (
    <>
      <SearchBar />
      <Carousel />
      <div className="titleListProduct mb-4 d-flex align-items-center justify-content-between">
        <h1 className="mb western-text">i Nostri Gin</h1>
        <div className="filterAndOrder d-flex justify-content-center align-items-center gap-3">
          <div className="position-relative">
            {/* Menù a tendina, Filtro per Metodo.*/}
            <FaFilter
              onClick={handleFilterClick}
              style={{
                cursor: "pointer",
                fontSize: "18pt",
                borderBottom: "2px solid",
                paddingBottom: "5.5px",
                color:
                  activeFilter !== "Tutti"
                    ? "var(--brand-gold-muted)"
                    : "inherit",
              }}
            />

            {showFilterMenu && (
              <div
                className="position-absolute bg-white shadow rounded p-2 mt-2"
                style={{
                  zIndex: 1000,
                  right: 0,
                  minWidth: "200px",
                  border: "1px solid #ddd",
                }}
              >
                <h6 className="mb-2 text-center">Filtra per tipologia</h6>
                <div className="d-flex flex-column">
                  {filterOptions.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleFilterSelect(option)}
                      className={`btn btn-sm text-start mb-1 ${
                        activeFilter === option ? "fw-bold" : ""
                      }`}
                      style={{
                        border: "none",
                        backgroundColor:
                          activeFilter === option ? "#f0f0f0" : "transparent",
                        transition: "background-color 0.2s ease",
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          {/* Icon Order per A-Z o Z-A */}
          {sortOrder === "default" || sortOrder === "dec" ? (
            <FaSortAlphaDown
              onClick={handleSortClick}
              style={{
                cursor: "pointer",
                fontSize: "1.7rem",
                borderBottom: "2px solid",
                paddingBottom: "5.5px",
              }}
            />
          ) : (
            <FaSortAlphaDownAlt
              onClick={handleSortClick}
              style={{
                cursor: "pointer",
                fontSize: "1.7rem",
                borderBottom: "2px solid",
                paddingBottom: "5.5px",
              }}
            />
          )}
        </div>
      </div>

      {/* LISTA PRODOTTI */}
      <div className="row gap-4 justify-content-center">
        {filteredProducts.map((p) => {
          return (
            <ProductRow
              key={p.id}
              id={p.id}
              title={p.title}
              category={p.category}
            />
          );
        })}
      </div>
    </>
  );
}
