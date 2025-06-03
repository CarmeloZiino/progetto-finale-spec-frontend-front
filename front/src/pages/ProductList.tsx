//Import React
import { useState, useRef, useEffect } from "react";

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

//Import Type
import type { FilterTypology } from "../types/filterTypology";

export default function ProductList() {

  const {
    filteredProducts,
    sortOrder,
    setSortOrder,
    activeFilter,
    setActiveFilter,
  } = useGlobalContext();
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const filterMenuRef = useRef(null);

  // Opzioni di filtro basate sulle tipologie di gin
  const filterOptions: FilterTypology[] = [
    "Tutti",
    "London Dry Gin",
    "Dry Gin",
    "Distilled Gin",
    "Italian Dry Gin",
    "Compound Gin",
    "Old Tom Gin",
    "Navy Strength",
    "Cold Distilled",
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

    // Aggiungi l'event listener solo se il menu è aperto
    if (showFilterMenu) {
      // Breve timeout per evitare che l'evento di click che apre il menu lo chiuda immediatamente
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

  // Funzione per aprire il menù a tendina con stopPropagation
  const handleFilterClick = (
    event: React.MouseEvent<SVGElement, MouseEvent>
  ) => {
    // Impedisci all'evento click di propagarsi al documento
    event.stopPropagation();
    setShowFilterMenu(!showFilterMenu);
  };

  // Anche per il click sulle opzioni del menu, aggiungi stopPropagation
  const handleFilterSelect = (
    option: FilterTypology,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setActiveFilter(option);
    setShowFilterMenu(false);
  };

  return (
    <>
      <SearchBar />
      <Carousel />
      <div className="mb-4 d-flex align-items-center justify-content-between">
        <h1 className="mb">i nostri gin</h1>
        <div className="filterAndOrder d-flex justify-content-center align-items-center gap-3">
          <div className="position-relative" ref={filterMenuRef}>
            {/* Menù a tendina, Filtro per Metodo. Ps. essendo che le Categorie rappresentano un unico prodotto (GIN) ho filtrato per il metodo di distillazione */}
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
                      onClick={(e) => handleFilterSelect(option, e)}
                      className={`btn btn-sm text-start mb-1 ${
                        activeFilter === option ? "fw-bold" : ""
                      }`}
                      style={{
                        border: "none",
                        backgroundColor:
                          activeFilter === option ? "#f0f0f0" : "transparent",
                        transition: "background-color 0.2s ease",
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          activeFilter === option ? "#f0f0f0" : "#f8f9fa")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          activeFilter === option ? "#f0f0f0" : "transparent")
                      }
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
                fontSize: "18pt",
                borderBottom: "2px solid",
                paddingBottom: "5.5px",
              }}
            />
          ) : (
            <FaSortAlphaDownAlt
              onClick={handleSortClick}
              style={{
                cursor: "pointer",
                fontSize: "18pt",
                borderBottom: "2px solid",
                paddingBottom: "5.5px",
              }}
            />
          )}
        </div>
      </div>
      <div className="row gap-4 justify-content-center">
        {filteredProducts.map((p) => {
          return (
            <ProductRow
              key={p.id}
              id={p.id}
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