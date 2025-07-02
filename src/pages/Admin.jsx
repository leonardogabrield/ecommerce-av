import React, { useState, useEffect, useContext } from "react";
import Header from '../page-layout/Header'
import Footer from '../page-layout/Footer'
import FormEdicion from '../administracion/FormEdicion';
import FormProducto from '../administracion/FormProducto';
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AdminContext } from "../context/AdminContext";

const Admin = () => {

    const { setIsAuth } = useContext(CartContext)

    const {
        productos,
        cargando,
        open,
        setOpen,
        openEditor,
        setOpenEditor,
        seleccionado,
        setSeleccionado,
        agregarProducto,
        actulizarProducto,
        eliminarProducto,
    } = useContext(AdminContext)

    const navigate = useNavigate()

    return (
        <>
            <Header />
            <div className="container">
                {cargando ? (
                    <div className="text-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">cargando...</span>
                        </div>
                    </div>
                ) : (
                    <>
                        {/*  <nav>
                        <ul className="nav">
                            <li className="navItem">
                                <button className="navButton" onClick={() => {
                                    setIsAuth(false);
                                    navigate('/');
                                    localStorage.removeItem('isAuth');
                                }}>
                                    <i className="fa-solid fa-right-from-bracket"></i>
                                </button>
                            </li>
                            <li className="navItem">
                                <a href="/admin">Admin</a>
                            </li>
                        </ul>
                    </nav> */}
                        <h1 className="display-3 text-center mx-5 my-5">Panel Administración</h1>


                        
                        <button className="addButton btn btn-primary mb-4 d-block me-0 ms-auto" onClick={() => setOpen(true)}>Agregar producto</button>

                        <div className="row row-cols-1 row-cols-md-6 g-4">

                            {productos.map((product) => (

                                <div class="col">
                                    <div class="card h-100">

                                        <img
                                            src={product.images[0]}
                                            alt={product.title}
                                            className="card-img-top"
                                        />

                                        <div class="card-body">
                                            <h5 class="card-title">{product.title}</h5>
                                            <p class="card-text">${product.price}</p>
                                        </div>
                                        <div class="card-footer">
                                            <div className="d-flex justify-content-between">
                                                <button className="editButton btn btn-primary btn-sm" onClick={() => {
                                                    setOpenEditor(true)
                                                    setSeleccionado(product)
                                                }}>Editar</button>

                                                <button className="deleteButton btn btn-primary btn-sm" onClick={() => eliminarProducto(product.id)}>Eliminar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            ))}

                        </div>


                    </>
                )}
                
                {open && (<FormProducto onAdd={agregarProducto} />)}
                {openEditor && (<FormEdicion productoSeleccionado={seleccionado} onUpdate={actulizarProducto} />)}
            </div>
            <Footer />
        </>

    )
}

export default Admin