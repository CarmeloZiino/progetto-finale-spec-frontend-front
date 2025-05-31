import Header from '../components/Header';
import { Outlet } from 'react-router-dom';

export default function DefaultLayout() {
  return (
    <>
      <Header />
      <main className="container p-5 d-flex flex-column justify-content-center">
        <Outlet />
      </main>
    </>
  );
}