//Components
import Header from "../components/Header";
import Footer from "../components/Footer";
//Import React
import { Outlet } from "react-router-dom";

//img
import bgMain from "../assets/bg.jpg";

export default function DefaultLayout() {
  return (
    <>
      <Header />

      <main
        id="mainBg"
        className=" containerd-flex flex-column justify-content-center"
      >
        <div className="container p-5">
          <Outlet />
        </div>
      </main>

      <Footer />
    </>
  );
}
