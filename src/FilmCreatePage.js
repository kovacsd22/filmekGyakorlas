import { useNavigate } from "react-router-dom";

export function FilmCreatePage() {
  const navigate = useNavigate();

  return (
    <div className="p-5 text-center content bg-whitesmoke">
      <h2>Új film</h2>
      <form
        onSubmit={(e) => {
          e.persist();
          e.preventDefault();
          fetch("https://localhost:7017/Film", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              nev: e.target.elements.nev.value,
              kiadasEve: parseInt(e.target.elements.kiadasEve.value),
              ertekeles: parseInt(e.target.elements.ertekeles.value),
              kepneve: e.target.elements.kepneve.value,
            }),
          })
            .then(() => {
              navigate("/");
            })
            .catch(console.log);
        }}
      >
        <div className="form-group row pb-3">
          <label className="col-sm3 col-form-label">Név:</label>
          <div>
            <input type="text" name="nev" className="form-control" />
          </div>
        </div>
        <div className="form-group row pb-3">
          <label className="col-sm3 col-form-label">Kiadás éve:</label>
          <div>
            <input type="number" name="kiadasEve" className="form-control" />
          </div>
        </div>
        <div className="form-group row pb-3">
          <label className="col-sm3 col-form-label">Értékelés:</label>
          <div>
            <input type="number" name="ertekeles" className="form-control" />
          </div>
        </div>
        <div className="form-group row pb-3">
          <label className="col-sm3 col-form-label">Kép neve:</label>
          <div>
            <input type="text" name="kepneve" className="form-control" />
          </div>
        </div>
        <button type="submit" className="btn btn-success">
          Küldés
        </button>
      </form>
    </div>
  );
}
