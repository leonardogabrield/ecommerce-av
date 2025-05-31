import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Cart from '../Cart'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';


const Header = () => {
  const [isCartOpen, setCartOpen] = useState(false)

  return (
    <header>



      <nav className="bg-dark d-flex py-4" data-bs-theme="dark">

        <ul className="nav me-auto gap-4 align-items-center">
          <li className="nav-item">

            <Link to='/' className="nav-link navbar-brand fw-bold text-white">E-COMMERCE</Link>

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


        <ul className="nav ms-auto align-items-center">
          <li className="nav-item">
            <button className="btn btn-outline" onClick={() => setCartOpen(true)}><FontAwesomeIcon icon={faShoppingCart} /></button>
            <Cart isOpen={isCartOpen} onClose={() => setCartOpen(false)} />
          </li>
          <li className="nav-item">
            <Link to='/admin' className='nav-link'><FontAwesomeIcon icon={faUser} /></Link>
          </li>
          <li className="nav-item">
            <Link to='/login' className='nav-link'><FontAwesomeIcon icon={faRightFromBracket} /></Link>
          </li>
        </ul>

      </nav>




    </header>
  )
}

export default Header
