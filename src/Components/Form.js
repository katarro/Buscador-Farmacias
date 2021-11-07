import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getPharmacys } from "./Api";
import fondo from "../Media/Kerfin7-NEA-2130.jpg";
import "../Styles/Form.css";
import Loader from "./Loader";
//https://farmanet.minsal.cl/maps/index.php/ws/getLocalesTurnos
function Form() {
  const [pharmacys, setPharmacys] = useState([]);
  const [searchPharmacy, setSearchPharmacy] = useState("");
  const [loading, setLoading] = useState(true);
  const { register } = useForm();

  const handleChange = (e) => {
    setSearchPharmacy(e.target.value);
  };

  useEffect(() => {
    const SavePharmacy = async () => {
      const arrayPharmacys = await getPharmacys(
        "https://farmanet.minsal.cl/maps/index.php/ws/getLocalesTurnos"
      );
      setPharmacys(arrayPharmacys);
      setLoading(false);
    };
    SavePharmacy();
  }, []);

  return (
    <React.Fragment>
      <div className="containerr">
	  <div >
        <form className="container-form">
          <input
            type="text"
            name="commune"
            required="required"
            placeholder="San miguel..."
            className="form-control"
            aria-label="Medium"
            ref={register}
            onChange={handleChange}
          />
        </form>

        <div className="container-cards">
          {loading ? (
            <div className="loader">
              <Loader />
            </div>
          ) : (
            pharmacys
              .filter((user) => {
                if (searchPharmacy === "") {
                  return user;
                } else if (
                  user.comuna_nombre
                    .toLowerCase()
                    .includes(searchPharmacy.toLocaleLowerCase())
                ) {
                  return user;
                } else if (
                  user.local_nombre
                    .toLowerCase()
                    .includes(searchPharmacy.toLocaleLowerCase())
                ) {
                  return user;
                }
              })
              .map((p) => (
                <div className="cards" key={p.local_id}>
                  <img className="img" src={fondo} alt="Foto Farmacia" />

                  <div className="nombre">
                    <h6>{p.local_nombre}</h6>
					<hr />
                  </div>
                  <div className="container-text">
                    <div className="comuna">{p.comuna_nombre}</div>
                    <div className="direccion">{p.local_direccion}</div>
					<hr />
                    <div className="hora">
                      {p.funcionamiento_hora_apertura} -
                      {p.funcionamiento_hora_cierre}
                    </div>
                    <div className="telefono">{p.local_telefono}</div>
                    <div className="fecha">{p.fecha}</div>
                  </div>
                  {/* <Link to="/form/maps">
                                    <div className="como-llegar">
                                        <strong>¡Cómo llegar!</strong>
                                    </div>
                                </Link> */}
                </div>
              ))
          )}
        </div>
      </div>
	  </div>
    </React.Fragment>
  );
}
export default Form;
