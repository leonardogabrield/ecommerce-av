import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../page-layout/Header'
import Footer from '../page-layout/Footer'

const Page404 = () => {
  return (
    <>
      <Header />
      <div className="container text-secondary text-center">
        <main>
          <h1 className="display-1 text-center my-5 py-5">404</h1>
          <Link to='/' className="text-center mb-5 pb-5">Volver al inicio</Link>
          <div className="d-block"></div>
        </main>
      </div>
      <Footer />
    </>
  )
}

export default Page404
