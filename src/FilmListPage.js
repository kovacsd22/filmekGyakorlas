import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

export function FilmListPage() {
  const [films, setFilms] = useState([]);
  const [isFetchPending, setFetchPending] = useState(false);

  useEffect(() => {
    setFetchPending(true);

    fetch(`https://localhost:7017/Film`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((filmek) => {
        console.log("Fetched films:", filmek);
        setFilms(filmek);
      })
      .catch((error) => console.error("Fetch error:", error))
      .finally(() => {
        setFetchPending(false);
      });
  }, []);

  return (
    <div className="p-5 m-auto text-center content bg-ivory">
      {isFetchPending ? (
        <div className="spinner-border"></div>
      ) : (
        <div>
          <h2>Filmek</h2>
          {films.map((film) => (
            <div
              key={film.id}
              className="card col-sm-3 d-inline-block m-1 p-2"
            >
              <h6 className="text-muted">{film.nev}</h6>
              <div>
                Kiadás éve: {film.kiadasEve}
              </div>
              <div className="lead">Értékelés: {film.ertekeles}</div>
              <NavLink key={film.id} to={"/film/" + film.id}>
                <div className="card-body">
                  <img
                    className="img-fluid"
                    style={{ maxHeight: 200 }}
                    alt={film.nev}
                    src={
                      film.kepneve
                        ? `${film.kepneve}`
                        : "https://via.placeholder.com/400x800"
                    }
                  />
                </div>
              </NavLink>
              <br />
              <NavLink key={film.id + 1} to={"/mod-film/" + film.id}>
                <i className="bi bi-pencil-square mx-1">Módosítás</i>
              </NavLink>
              <NavLink
                key={film.id + 2}
                to={"/del-film/" + film.id}
                className={"text-danger"}
              >
                <i className="bi bi-trash3">Törlés</i>
              </NavLink>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
