import { Routes, Route, BrowserRouter } from "react-router-dom";

//Import Provider
import { GlobalProvider } from "./context/GlobalContext";

//Layout
import DefaultLayout from "./layouts/DefaultLayout";

//Pages
import ProductList from "./pages/ProductList";

function App() {
  return (
    <>
      <GlobalProvider>
        <BrowserRouter>
          <Routes>
            <Route Component={DefaultLayout}>
              <Route path="/" Component={ProductList} />
              {/* <Route path="/:id" Component={} /> */}
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </>
  );
}

export default App;
