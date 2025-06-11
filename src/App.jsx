import { Routes, Route, BrowserRouter } from "react-router-dom";

//Import Provider
import { GlobalProvider } from "./context/GlobalContext";
import { WishlistProvider } from "./context/WishlistContext";

//Layout
import DefaultLayout from "./layouts/DefaultLayout";

//Pages
import ProductList from "./pages/ProductList";
import DetailsPage from "./pages/DetailsPage";
import ComparePage from "./pages/ComparePage";

function App() {
  return (
    <>
      <GlobalProvider>
        <WishlistProvider>
          <BrowserRouter>
            <Routes>
              <Route Component={DefaultLayout}>
                <Route path="/" Component={ProductList} />
                <Route path="/:id" Component={DetailsPage} />
                <Route path="/compare" Component={ComparePage} />
              </Route>
            </Routes>
          </BrowserRouter>
        </WishlistProvider>
      </GlobalProvider>
    </>
  );
}

export default App;
