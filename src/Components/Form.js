import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getPharmacys } from './Api';
import fondo from '../Media/Kerfin7-NEA-2130.jpg';
import '../Styles/Form.css';
import { Link } from 'react-router-dom'
import Loader from './Loader'
//https://farmanet.minsal.cl/maps/index.php/ws/getLocalesTurnos
function Form() {
	const [pharmacys, setPharmacys] = useState([]);
	const [searchPharmacy, setSearchPharmacy] = useState('');
    const [ loading, setLoading] = useState(true)
	const { register } = useForm();

	const handleChange = (e) => {
		setSearchPharmacy(e.target.value);
	};

	useEffect(() => {
		const SavePharmacy = async () => {
			const arrayPharmacys = await getPharmacys('https://farmanet.minsal.cl/maps/index.php/ws/getLocalesTurnos');
			setPharmacys(arrayPharmacys);
            setLoading(false)
		};
		SavePharmacy();
	}, []);

	return (
		<React.Fragment>
			<form>
				<div className="input">
					<input
						type="text"
						name="commune"
						required="required"
						placeholder="Name of commune or pharmacy..."
						className="form-control"
						aria-label="Medium"
						ref={register}
						onChange={handleChange}
					/>
				</div>
			</form>

			<div className="Pharmacys">
				<div className="container">
                    
					{
                        loading ? ( <div className="loader"><Loader/></div> ):
                        (
                            pharmacys
						.filter((user) => {
							if (searchPharmacy === '') {
								return user;
							} else if (user.comuna_nombre.toLowerCase().includes(searchPharmacy.toLocaleLowerCase())) {
								return user;
							} else if (user.local_nombre.toLowerCase().includes(searchPharmacy.toLocaleLowerCase())) {
								return user;
							}
						})
						.map((p) => (
							<div className="cards" key={p.local_id}>
								<img className="img-2" src={fondo} alt="foto farmacia" />

								<div className="nombre">
									<h6>{p.local_nombre}</h6>
								</div>
								<div className="comuna">{p.comuna_nombre}</div>
								<div className="direccion">{p.local_direccion}</div>
								<div className="hora">
									{p.funcionamiento_hora_apertura} -{p.funcionamiento_hora_cierre}
								</div>
								<div className="telefono">{p.local_telefono}</div>
								<div className="fecha">{p.fecha}</div>
                                {/* <Link to="/form/maps">
                                    <div className="como-llegar">
                                        <strong>¡Cómo llegar!</strong>
                                    </div>
                                </Link> */}
							</div>
						))
                        ) 
                    }
				</div>
			</div>
		</React.Fragment>
	);
}
export default Form;
