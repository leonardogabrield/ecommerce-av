import React, { useContext } from 'react'
import Header from '../page-layout/Header'
import Footer from '../page-layout/Footer'
import { CartContext } from '../context/CartContext'
import ProductDetail from '../components/ProductDetail'
const DetalleDeProducto = () => {

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

              <ProductDetail />
          }
        </main>
      </div>
      <Footer />
    </>
  )
}

export default DetalleDeProducto