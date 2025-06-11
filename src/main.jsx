import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "bootstrap/dist/css/bootstrap.min.css";

// Importa il JavaScript di Bootstrap
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "./style/social.css";
import "./style/comparePage.css";
import "./style/wishlist.css";
import "../src/style/carousel.css";
import "../src/style/font.css";
import "./style/root.css";
import "./style/card.css";
import "./index.css";

import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
