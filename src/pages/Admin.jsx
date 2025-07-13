import React, { useContext } from "react";
import Header from '../page-layout/Header'
import Footer from '../page-layout/Footer'
import FormEdicion from '../administracion/FormEdicion';
import FormProducto from '../administracion/FormProducto';
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";

const Admin = () => {
    const {
        productos,
        cargando,
        open,
        setOpen,
        openEditor,
        setOpenEditor,
        seleccionado,
        setSeleccionado,
        addProducto,
        updateProducto,
        removeProducto,
    } = useContext(AdminContext)

    const navigate = useNavigate()

    return (
        <>
            <Header />
            <div className="container">
                {cargando ? (
                    <div className="text-center mt-5">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">cargando...</span>
                        </div>
                    </div>
                ) : (
                    <>

                        <h1 className="display-3 text-center mx-5 my-5">Panel Administración</h1>

                        <button className="addButton btn btn-primary mb-4 d-block mx-auto" onClick={() => setOpen(true)}>Agregar producto</button>

                        <div className="row row-cols-1 row-cols-md-6 g-5 mb-5">

                            { productos.map((product) => (

                                <div className="col mb-3" key={product.id}>
                                    <div className="card h-100 ">

                                        <img
                                            src={product.images[0]}
                                            alt={product.title}
                                            className="card-img-top"
                                        />

                                        <div className="card-body">
                                            <h5 className="card-title">{product.title}</h5>
                                            <p className="card-text">${product.price}</p>
                                        </div>
                                        <div className="card-footer">
                                            <div className="d-flex justify-content-between">
                                                <button className="editButton btn btn-primary btn-sm" onClick={() => {
                                                    setOpenEditor(true)
                                                    setSeleccionado(product)
                                                }}>Editar</button>

                                                <button className="deleteButton btn btn-primary btn-sm" onClick={() => removeProducto(product.id)}>Eliminar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            ))
                            
                            
                            }

                        </div>

                    </>
                )}

                {open && (
                    <div className="modal show d-block" tabIndex="-1">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-3" id="agregarProductoModal">Agregar Producto</h1>
                                    <button type="button" onClick={() => setOpen(false)} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <FormProducto onAdd={addProducto} />
                                </div>
                                <div className="modal-footer">
                                </div>
                            </div>
                        </div>
                        <div className="modal-backdrop fade show z-n1"></div>
                    </div>
                )}


                {openEditor && (


                    <div className="modal show d-block" tabIndex="-1">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-3" id="editarProductoModal">Editar Producto</h1>
                                    <button type="button" onClick={() => setOpenEditor(false)} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <FormEdicion productoSeleccionado={seleccionado} onUpdate={updateProducto} />
                                </div>
                                <div className="modal-footer">
                                </div>
                            </div>
                        </div>
                        <div className="modal-backdrop fade show z-n1"></div>
                    </div>


                )}
            </div>



            <Footer />
        </>

    )
}

export default Admin