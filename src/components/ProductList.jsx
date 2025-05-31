import React, { useContext } from 'react'
import Product from './Product'
import { CartContext } from '../context/CartContext'

const ProductList = () => {
    const { productos } = useContext(CartContext)
    
 
    if (!productos || productos.length === 0) {
        return (
            <>
                <h2 className="h2 text-center mb-4 fw-normal">Listado de productos</h2>
                <p className="text-center text-muted">No hay productos disponibles</p>
            </>
        )
    }
    
    return (
        <>
            <h2 className="h2 text-center mb-4 fw-normal">Listado de productos</h2>
            <div className="row row-cols-1 row-cols-md-3 row-cols-lg-5 g-4">
                {
                    productos.map(producto => (
                        <Product key={producto.id} producto={producto} />
                    ))
                }
            </div>
        </>
    )
}

export default ProductList
