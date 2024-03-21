import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";

export function FilmSinglePage() {
  const param = useParams();
  const filmId = param.id;

  const [film, setFilm] = useState({});
  const [isPending, setPending] = useState(false);

  useEffect(() => {
    setPending(true);

    fetch(`https://localhost:7017/Film/${filmId}`)
      .then((res) => res.json())
      .then((data) => setFilm(data))
      .catch(console.log)
      .finally(() => {
        setPending(false);
      });
  }, [filmId]);

  return (
    <div className="p-5 m-auto text-center content bg-lavender">
      {isPending || !film.id ? (
        <div className="spinner-border"></div>
      ) : (
        <div>
          <div className="card p-3">
            <div className="card-body">
              <h4>{film.nev}</h4>
            </div>
            <h5 className="card-title">
              Kiadás éve: {film.kiadasEve}
            </h5>
            <div className="lead">Értékelés: {film.ertekeles}</div>
            <NavLink to={"/"}>
              <img
                className="img-fluid rounded"
                style={{ maxHeight: "200px" }}
                alt={film.nev}
                src={
                  film.kepneve
                    ? `/${film.kepneve}`
                    : "https://via.placeholder.com/400x800"
                }
              />
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
}
