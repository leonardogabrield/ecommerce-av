import React, { useContext } from 'react'
import Header from '../components/estaticos/Header'
import Footer from '../components/estaticos/Footer'

const Admin = () => {

  return (
    <>
      <Header />
      <div className="container">
        <main>
          {

             <h1 className="display-3 text-center mx-5 pb-5">Panel Administración</h1>
          }
        </main>
      </div>
      <Footer />
    </>

  )
}

export default Admin