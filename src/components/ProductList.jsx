import React, { useContext, useState, useEffect } from 'react'
import Product from './Product'
import { CartContext } from '../context/CartContext'
import './ProductList.css'

const ProductList = ({ scrollRef }) => {

    const { productos } = useContext(CartContext)

    const [busqueda, setBusqueda] = useState('');
    const [paginaActual, setPaginaActual] = useState(1);

    const productosPorPagina = 10;

    const productosFiltrados = productos.filter(producto =>
        producto.title.toLowerCase().includes(busqueda.toLowerCase())
    );

    const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);
    const indexUltimo = paginaActual * productosPorPagina;
    const indexPrimero = indexUltimo - productosPorPagina;
    const productosActuales = productosFiltrados.slice(indexPrimero, indexUltimo);
    const cambiarPagina = (numero) => setPaginaActual(numero);

    useEffect(() => {
        if (scrollRef && scrollRef.current) {
            scrollRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    }, [paginaActual, scrollRef]);

    useEffect(() => {
        setPaginaActual(1);
    }, [busqueda]);


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
            <div className="mb-4 d-flex justify-content-center">
                <input
                    type="text"
                    className="form-control search-field border-secondary-subtle"
                    placeholder="Buscar producto por nombre..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                />
            </div>
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
