import React, { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import Header from '../components/estaticos/Header'
import Footer from '../components/estaticos/Footer'

const Contacto = () => {

   const { cargando } = useContext(CartContext)

  return (

    <>
      <Header />
      <div className="container">
        <main>
          {
            cargando ? <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">cargando...</span>
              </div>
            </div> :

             <h1 className="display-3 text-center mx-5 pb-5">Contacto</h1>
          }
        </main>
      </div>
      <Footer />
    </>



  )
}

export default Contacto
