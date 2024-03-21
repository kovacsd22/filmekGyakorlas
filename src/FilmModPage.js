import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export function FilmModPage() {
  const params = useParams();
  const navigate = useNavigate();
  const filmId = params.id;

  const [, setFilm] = useState({});
  const [modNev, setModNev] = useState("");
  const [modKiadasEve, setModKiadasEve] = useState(0);
  const [modErtekeles, setModErtekeles] = useState(0);
  const [modKepneve, setModKepneve] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `https://localhost:7017/Film/${filmId}`,
        );
        const data = await response.json();

        setFilm(data);
        setModNev(data.nev);
        setModKiadasEve(data.kiadasEve);
        setModErtekeles(data.ertekeles);
        setModKepneve(data.kepneve);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [filmId]);

  const handleNevChange = (e) => {
    setModNev(e.target.value);
  };

  const handleKiadasEveChange = (e) => {
    setModKiadasEve(e.target.value);
  };

  const handleErtekelesChange = (e) => {
    setModErtekeles(e.target.value);
  };

  const handleKepneveChange = (e) => {
    setModKepneve(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`https://localhost:7017/Film/${filmId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: filmId,
        nev: modNev,
        kiadasEve: modKiadasEve,
        ertekeles: modErtekeles,
        kepneve: modKepneve,
      }),
    })
      .then(() => {
        navigate("/");
      })
      .catch(console.error);
  };

  return (
    <div className="p-5 text-center content bg-lavender">
      <h2>Film módosítása</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group row pb-3">
          <label className="col-sm-3 col-form-label">Név:</label>
          <div>
            <input
              type="text"
              name="nev"
              className="form-control"
              defaultValue={modNev}
              onChange={handleNevChange}
            />
          </div>
        </div>
        <div className="form-group row pb-3">
          <label className="col-sm-3 col-form-label">Kiadás éve:</label>
          <div>
            <input
              type="number"
              name="kiadasEve"
              className="form-control"
              defaultValue={modKiadasEve}
              onChange={handleKiadasEveChange}
            />
          </div>
        </div>
        <div className="form-group row pb-3">
          <label className="col-sm-3 col-form-label">Értékelés:</label>
          <div>
            <input
              type="number"
              name="ertekeles"
              className="form-control"
              defaultValue={modErtekeles}
              onChange={handleErtekelesChange}
            />
          </div>
        </div>
        <div className="form-group row pb-3">
          <label className="col-sm-3 col-form-label">Kép neve:</label>
          <div>
            <input
              type="text"
              name="kepneve"
              className="form-control"
              defaultValue={modKepneve}
              onChange={handleKepneveChange}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-success">
          Küldés
        </button>
      </form>
    </div>
  );
}
