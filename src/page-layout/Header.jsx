import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Cart from '../components/Cart'
import './Header.css'
import { useAuth } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import isologo from '../assets/isologo.svg';
import { faUser, faShoppingCart, faRightFromBracket, faRightToBracket } from '@fortawesome/free-solid-svg-icons';


const Header = () => {

  const { isAuth, logout } = useAuth();

  const [isCartOpen, setCartOpen] = useState(false)

  return (
    <header className="bg-dark">

      <div className="container">

        <nav className="d-flex py-4 flex-column flex-md-row align-items-center justify-content-between" data-bs-theme="dark">

          <ul className="nav gap-md-4 align-items-center justify-content-center">
            <li className="nav-item brand">

              <Link to='/' className="nav-link navbar-brand fw-bold text-white text-center"><img src={isologo} width="185" height="auto" /></Link>

            </li>
            <li className="nav-item">
              <Link to='/' className='nav-link active'>Home</Link>
            </li>
            <li className="nav-item">
              <Link to='/productos' className='nav-link'>Productos</Link>
            </li>
            <li className="nav-item">
              <Link to='/contacto' className='nav-link'>Contacto</Link>
            </li>
          </ul>


          <ul className="nav align-items-center">
            <li className="nav-item">
              <button className="nav-link" onClick={() => setCartOpen(true)}><FontAwesomeIcon icon={faShoppingCart} /></button>
              <Cart isOpen={isCartOpen} onClose={() => setCartOpen(false)} />
            </li>
            <li className="nav-item">
              <Link to='/admin' className='nav-link'><FontAwesomeIcon icon={faUser} /></Link>
            </li>

            <li className="nav-item">

              {!isAuth
                ? <Link to='/login' className='nav-link' title="Ingresar"><FontAwesomeIcon icon={faRightToBracket} /></Link>
                : <button onClick={logout} className='nav-link' title="Salir"><FontAwesomeIcon icon={faRightFromBracket} /></button>
              }


            </li>
          </ul>

        </nav>

      </div>


    </header>
  )
}

export default Header
