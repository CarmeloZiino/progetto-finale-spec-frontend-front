import { Routes, Route, BrowserRouter } from "react-router-dom";

//Layout
import DefaultLayout from "./layouts/DefaultLayout";

//Pages
import ProductList from "./pages/ProductList";



function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route Component={DefaultLayout}>
            <Route path="/" Component={ProductList} />
            {/* <Route path="/:id" Component={} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
