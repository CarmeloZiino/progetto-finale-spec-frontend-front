import { Routes, Route, BrowserRouter } from "react-router-dom";

//Layout
import DefaultLayout from "./layouts/DefaultLayout";

//Pages
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route Component={DefaultLayout}>
            <Route path="/" Component={HomePage} />
            {/* <Route path="/:id" Component={} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
