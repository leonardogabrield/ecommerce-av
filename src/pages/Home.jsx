import React, { useContext } from 'react'
import Header from '../page-layout/Header'
import Footer from '../page-layout/Footer'
import ProductList from '../components/ProductList'
import { CartContext } from '../context/CartContext'


const Home = () => {
  const { cargando } = useContext(CartContext)


  return (
    <>
      <Header />
      <div className="container">
        <main>
          <h1 className="display-3 text-center mx-5 pb-5 mt-5">OnlineShop</h1>
          {
            cargando ?

              <div className="text-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">cargando...</span>
                </div>
              </div>

              :

              <ProductList />
          }

        </main>
      </div>
      <Footer />
    </>
  )
}

export default Home
