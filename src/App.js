import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import {FilmListPage} from "./FilmListPage";
import {FilmSinglePage} from "./FilmSinglePage";
import {FilmCreatePage} from "./FilmCreatePage";
import {FilmModPage} from "./FilmModPage";
import {FilmDeletePage} from "./FilmDeletePage";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to="/" className="active">
                <span className="nav-link">Filmek</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/uj-film" className="active">
                <span className="nav-link">Új film</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<FilmListPage />} />
        <Route path="/film/:id" element={<FilmSinglePage />} />
        <Route path="/uj-film" element={<FilmCreatePage />} />
        <Route path="/mod-film/:id" element={<FilmModPage />} />
        <Route path="/del-film/:id" element={<FilmDeletePage />} />
      </Routes>
    </Router>
  );
}

export default App;
