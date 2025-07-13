import React, { useContext, useState } from 'react'
import Product from './Product'
import { CartContext } from '../context/CartContext'

const ProductList = () => {

    const { productos } = useContext(CartContext)


    const [paginaActual, setPaginaActual] = useState(1);
    const productosPorPagina = 10;
    const indexUltimo = paginaActual * productosPorPagina;
    const indexPrimero = indexUltimo - productosPorPagina;
    const productosActuales = productos.slice(indexPrimero, indexUltimo);
    const totalPaginas = Math.ceil(productos.length / productosPorPagina);
    const cambiarPagina = (numero) => setPaginaActual(numero);

 
    if (!productos || productos.length === 0) {
        return (
            <>
                <h2 className="h2 text-center mb-4 fw-normal">Listado de productos</h2>
                <p className="text-center text-muted">No hay productos para mostrar</p>
            </>
        )
    }
    
    return (
        <>
            <h2 className="h2 text-center mb-4 fw-normal">Listado de productos</h2>
            <div className="row row-cols-1 row-cols-md-3 row-cols-lg-5 g-5">
                {
                    productosActuales.map(producto => (
                        <Product key={producto.id} producto={producto} />
                    ))
                }
            </div>

            
            {/* Paginación */}
            <nav className="d-flex justify-content-center mt-4">
                <ul className="pagination">
                    {
                        Array.from({ length: totalPaginas }, (_, i) => (
                            <li key={i} className={`page-item ${paginaActual === i + 1 ? 'active' : ''}`}>
                                <button className="page-link" onClick={() => cambiarPagina(i + 1)}>
                                    {i + 1}
                                </button>
                            </li>
                        ))
                    }
                </ul>
            </nav>


        </>
    )
}

export default ProductList
