import React, { useContext } from 'react'
import Header from '../components/estaticos/Header'
import Footer from '../components/estaticos/Footer'
import ProductList from '../components/ProductList'
import { CartContext } from '../context/CartContext'
const ListadoDeProductos = () => {

  const { cargando } = useContext(CartContext)

  return (
    <>
      <Header />
      <div className="container">
        <main>


          <h1 className="display-3 text-center mx-5 pb-5">Productos</h1>
          {
            cargando ? <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">cargando...</span>
              </div>
            </div> :

              <ProductList />
          }

        </main>
      </div>
      <Footer />
    </>
  )
}

export default ListadoDeProductos
