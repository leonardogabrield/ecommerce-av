import React, { useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { CartContext } from '../context/CartContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';


const ProductDetail = () => {

  const { add2Cart } = useContext(CartContext)
  const [ cantidad, setCantidad] = useState(1);
  const { productos } = useContext(CartContext)
  const { id } = useParams()
  const product = productos.find(producto => producto.id == id)


    const increase = () => {
      if (cantidad < product.stock) {
        setCantidad(prev => prev + 1);
      }
    };
    
    const decrease = () => {
      if (cantidad > 1) {
        setCantidad(prev => prev - 1);
      }
    };
    
    const handleAdd2Cart = () => {
      if (cantidad > 0 && cantidad <= product.stock) {
        add2Cart({ ...product, cantidad: cantidad });
      }
    };

  return (
    <>
      <div className="row">

        {product ? (

          <>

          <div className="col-md-6 mb-4">
            <img src={product.images[0]} alt={product.title} className="img-fluid" />
          </div>
          
          
          <div className="col-md-6">
              <h2 className="display-3 text-start mt-5">{product.title}</h2>
              <p className="text-muted mb-4">SKU: {product.sku}</p>
              <div className="mb-3">
                <span className="h4 me-2">${product.price}</span>
                <span className="text-muted"><s>${product.price * 1.25}</s></span>
              </div>
              <p className="mb-4">{product.description}</p>
              <div className="mb-4">
              </div>
              <div className="mb-4">
                   <div className='d-flex justify-content-start align-items-center gap-2 mb-3'>
              <button 
                className="btn btn-secondary btn-small py-1" 
                onClick={decrease}
                disabled={cantidad <= 1}
              >
                -
              </button>
              <span>{cantidad}</span>
              <button 
                className="btn btn-secondary btn-small py-1" 
                onClick={increase}
                disabled={cantidad >= product.stock}
              >
                +
              </button>
            </div>
              </div>
              <button className="btn btn-primary btn-lg mb-3 me-2" onClick={handleAdd2Cart}>
              Agregar <FontAwesomeIcon icon={faCartPlus} className="fs-5 ps-2" />
              </button>
            </div>
            
            </>


        ) : (<p>Producto no encontrado</p>)}


      </div>

    </>





  )
}

export default ProductDetail
