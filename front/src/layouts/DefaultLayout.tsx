//Components
import Header from '../components/Header';
// import Wishlist from '../components/Wishlist'
//Import React
import { Outlet } from 'react-router-dom';

export default function DefaultLayout() {
  return (
    <>
      <Header />
      {/* <Wishlist show={x} onClose={x} wishProducts={{x}}/> */}
      <main className="container p-5 d-flex flex-column justify-content-center">
        <Outlet />
      </main>
    </>
  );
}