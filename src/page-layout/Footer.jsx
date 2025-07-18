import React from 'react'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <footer className="bg-dark-subtle h-100 pb-5" style={{ marginTop: '95px' }}>

      <div className="container d-flex flex-column flex-md-row flex-wrap justify-content-between align-items-center py-3 mt-4 border-top">
        
        <p className="col-md-4 mb-0 text-body-secondary text-start">© 2025 Ecommerce Online</p>
        <Link to='/' className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none fw-bold text-body">OnlineShop</Link>

        <ul className="nav col-md-4 justify-content-end">
          <li className="nav-item">
            <Link to='/' className="nav-link px-2 text-body-secondary">Home</Link>
          </li>
          <li className="nav-item">
            <Link to='/productos' className="nav-link px-2 text-body-secondary">Productos</Link>
          </li>
          <li className="nav-item">
            <Link to='/contacto' className="nav-link px-2 text-body-secondary">Contacto</Link>
          </li>
        </ul>

      </div>

    </footer>
  )
}

export default Footer
