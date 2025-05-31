import React from 'react'
import Header from '../page-layout/Header'
import Footer from '../page-layout/Footer'

const Admin = () => {

  return (
    <>
      <Header />
      <div className="container">
        <main>
          {

             <h1 className="display-3 text-center mx-5 my-5">Panel Administración</h1>
          }
        </main>
      </div>
      <Footer />
    </>

  )
}

export default Admin