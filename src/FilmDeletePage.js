import React, { useState, useEffect } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";

export function FilmDeletePage() {
  const navigate = useNavigate();
  const param = useParams();
  const filmId = param.id;

  const [film, setFilm] = useState({});
  const [isPending, setPending] = useState(false);

  useEffect(() => {
    setPending(true);

    (async () => {
      try {
        const res = await fetch(
          `https://localhost:7017/Film/${filmId}`,
        );
        const data = await res.json();
        setFilm(data);
      } catch (error) {
        console.log(error);
      } finally {
        setPending(false);
      }
    })();
  }, [filmId]);

  const handleDelete = async (e) => {
    try {
      e.preventDefault();

      await fetch(`https://localhost:7017/Film/${filmId}`, {
        method: "DELETE",
      });

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-5 m-auto text-center content bg-lavender">
      {isPending || !film.id ? (
        <div className="spinner-border"></div>
      ) : (
        <div>
          <h2>Film törlése</h2>
          <div className="card p-3">
            <div className="card-body">
              <h4>{film.nev}</h4>
              <h5 className="card-title">
                Kiadás éve: {film.kiadasEve}
              </h5>
              <div className="lead">Értékelés: {film.ertekeles}</div>
              <img
                className="img-fluid rounded"
                style={{ maxHeight: "500px" }}
                alt={film.nev}
                src={
                  film.kepneve
                    ? `https://localhost:7017/images/${film.kepneve}`
                    : "https://via.placeholder.com/400x800"
                }
              />
            </div>
            <form onSubmit={handleDelete}>
              <div>
                <NavLink to={"/"}>
                  <button className="bi bi-backspace btn btn-warning rounded">
                    Mégsem
                  </button>
                </NavLink>
                <button className="bi bi-trash3 btn btn-danger rounded">
                  Törlés
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
