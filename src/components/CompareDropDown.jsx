//React
import { useState } from "react";
//Import Context
import { useGlobalContext } from "../context/GlobalContext";

export default function CompareDropDown() {
  const { products } = useGlobalContext();

  const [compareProductId, setCompareProductId] = useState(1);

  const handleChange = (e) => {
    // Converto il valore (che è una stringa) in numero
    const selectedId = parseInt(e.target.value, 10);
    setCompareProductId(selectedId);
  };

  return (
    <>
      <div className="d-flex flex-column gap-3 justify-content-center align-items-center">
        <select
          value={compareProductId}
          className="dropdown"
          onChange={handleChange}
        >
          {products.map((p) => {
            return (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            );
          })}
        </select>

        {compareProductId ? (
          (() => {
            const selectedProduct = products.find(
              (p) => p.id === compareProductId
            );
            return selectedProduct ? (
              <div
                className="singleDropdown d-flex flex-column align-items-center gap-4 product-card"
                key={selectedProduct.id}
              >
                <img
                  src={`/gin/${selectedProduct.title}.jpeg`}
                  alt={`Img ${selectedProduct.title}`}
                  style={{
                    height: "100px",
                    borderRadius: "10pt",
                    border: "1px solid var(--input-border)",
                  }}
                />
                <div className="singleDetail mb-4">
                  <p className="text-center nameProduct">
                    {selectedProduct.title}
                  </p>
                </div>
                <div className="singleDetail d-flex flex-column justify-content-center align-items-center gap-2">
                  <span className="text-center">Metodo di distillazione: </span>
                  <p>{selectedProduct.category}</p>
                </div>
                <div className="singleDetail d-flex flex-column justify-content-center align-items-center gap-2">
                  <span>Formato: </span>
                  <p>{selectedProduct.format}</p>
                </div>
                <div className="singleDetail d-flex flex-column justify-content-center align-items-center gap-2">
                  <span>Grado Alcolemico: </span>
                  <p>{selectedProduct.alcolContent}%</p>
                </div>
                <div className="singleDetail d-flex flex-column justify-content-center align-items-center gap-2">
                  <span>Provenienza: </span>
                  <p>{selectedProduct.origin}</p>
                </div>

                <div className="singleDetail d-flex flex-column justify-content-center align-items-center gap-2">
                  <span>Gusto e Aroma: </span>
                  <p className="text-center" style={{ width: "150px" }}>
                    {selectedProduct.taste}
                  </p>
                </div>
              </div>
            ) : (
              <p>Prodotto non trovato</p>
            );
          })()
        ) : (
          <h1>Seleziona un prodotto</h1>
        )}
      </div>
    </>
  );
}
