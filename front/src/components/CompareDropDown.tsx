//React
import { useState } from "react";
//Import Context
import { useGlobalContext } from "../context/GlobalContext";

export default function CompareDropDown() {
  const { products } = useGlobalContext();

  const [compareProductId, setCompareProductId] = useState<number>(1);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
                className="d-flex flex-column align-items-center gap-2 product-card"
                key={selectedProduct.id}
              >
                <img
                  src={`/gin/${selectedProduct.image}`}
                  alt={`Img ${selectedProduct.title}`}
                  style={{ width: "150px", borderRadius: "10pt" }}
                />
                <p>{selectedProduct.title}</p>
                <p>{selectedProduct.category}</p>
                <p>{selectedProduct.format}</p>

                <p>{selectedProduct.alcolContent}%</p>
                <p>{selectedProduct.origin}</p>
                <p>{selectedProduct.typology}</p>
                <p className="text-center" style={{ width: "150px" }}>
                  {selectedProduct.taste}
                </p>
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
