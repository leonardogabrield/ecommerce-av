import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Product = ({ producto }) => {
  const { add2Cart } = useContext(CartContext)
  const [ cantidad, setCantidad] = useState(1);
  
  const increase = () => {
    if (cantidad < producto.stock) {
      setCantidad(prev => prev + 1);
    }
  };
  
  const decrease = () => {
    if (cantidad > 1) {
      setCantidad(prev => prev - 1);
    }
  };
  
  const handleAdd2Cart = () => {
    if (cantidad > 0 && cantidad <= producto.stock) {
      add2Cart({ ...producto, cantidad: cantidad });
    }
  };
  
  return (

<div className="col">
    <div className="card text-center h-100">
      <img src={producto.images[0]} alt={producto.title} className='imagen' />
      <div className="card-body">
        <h5 className="card-title">{producto.title}</h5>
        <p className="card-text lead">${producto.price}</p>
        <p className="card-text small mb-1">STOCK: {producto.stock}</p>
        <p className="card-text small mb-1">SKU: {producto.sku}</p>
        
        {producto.stock > 0 ? (
          <>
            <div className="d-flex justify-content-center align-items-center gap-2 mb-3">
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
                disabled={cantidad >= producto.stock}
              >
                +
              </button>
            </div>
            
            <button 
              className="btn btn-primary my-2 d-block mx-auto" 
              onClick={handleAdd2Cart}
            >
              Agregar al carrito
            </button>
          </>
        ) : (
          <p className="text-danger">Sin stock disponible</p>
        )}
        
        <Link to={`/producto/${producto.id}`} className="small mt-3">
          Ver detalle
        </Link>
      </div>
    </div>
 </div>

  )
}

export default Product;
