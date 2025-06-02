//Import Essenziali

//Logo
import logo from "../assets/GintasticDue.png";

export default function Header() {
  return (
    <>
      <header className="p-2">
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              <img src={logo} width={75} className="rounded-3" alt="LOGO" />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav gap-3 me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="#">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Comparator
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <form id='searchBar' className="d-flex container">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Roby Marton 55"
          aria-label="Search"
        />
        <button className="btnSearch" type="submit">
          Search
        </button>
      </form>
    </>
  );
}
