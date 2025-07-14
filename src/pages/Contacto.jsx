import React from 'react'
import Header from '../page-layout/Header'
import Footer from '../page-layout/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faPaperPlane, faMapMarker, faGlobe } from '@fortawesome/free-solid-svg-icons';

const Contacto = () => {

	return (

		<>
			<Header />
			<div className="container">
				<main>

					<h1 className="display-3 text-center mt-5 mb-3 pb-5">Contacto</h1>
					<div style={{
						display: 'flex',
						flexDirection: 'column',
						gap: '1rem',
						maxWidth: '450px',
						margin: 'auto',
					}}>
						<p className="mb-4 lead">Estamos abiertos a cualquier sugerencia o responder sus consultas.</p>
						<div className="dbox w-100 d-flex align-items-center">
							<div className="icon d-flex align-items-center justify-content-center">
								<span className="fa fa-map-marker"></span>
								<FontAwesomeIcon icon={faMapMarker} />
							</div>
							<div className="text pl-3">
								<p className="mb-0 ps-3"><span>Dirección:</span> Av. Bernabé Márquez 1195, B1642 San Isidro, Provincia de Buenos Aires</p>
							</div>
						</div>
						<div className="dbox w-100 d-flex align-items-center">
							<div className="icon d-flex align-items-center justify-content-center">
								<FontAwesomeIcon icon={faPhone} />
							</div>
							<div className="text pl-3">
								<p className="mb-0 ps-3"><span>Teléfono:</span> <a href="tel://1234567920">+54 9 11 1234 5566</a></p>
							</div>
						</div>
						<div className="dbox w-100 d-flex align-items-center">
							<div className="icon d-flex align-items-center justify-content-center">
								<FontAwesomeIcon icon={faPaperPlane} />
							</div>
							<div className="text pl-3">
								<p className="mb-0 ps-3"><span>Email:</span> <a href="mailto:info@yoursite.com">info@ecommerce-online.com</a></p>
							</div>
						</div>
						<div className="dbox w-100 d-flex align-items-center">
							<div className="icon d-flex align-items-center justify-content-center">
								<FontAwesomeIcon icon={faGlobe} />
							</div>
							<div className="text pl-3">
								<p className="mb-0 ps-3"><span>Website</span> <a href="#">ecommerce-online.com</a></p>
							</div>
						</div>
					</div>
				</main>
			</div>
			<Footer />
		</>

	)
}

export default Contacto
