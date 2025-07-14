import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

const Product = ({ producto }) => {
  const { add2Cart } = useContext(CartContext)
  const [cantidad, setCantidad] = useState(1);

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
        <img src={producto.images[0]} alt={producto.title} className="imagen card-img-top" />
        <div className="card-body">
          <h5 className="card-title">{producto.title}</h5>
          <p className="card-text lead">${producto.price}</p>
          <p className="card-text small mb-1">STOCK: {producto.stock}</p>
          <p className="card-text small mb-1">SKU: {producto.sku}</p>
        </div>

        <div className="card-footer border-0">
          {producto.stock > 0 ? (
            <>
              <div className="d-flex justify-content-center align-items-center gap-2">
                <button
                  className="btn btn-secondary py-1 fw-semibold"
                  onClick={decrease}
                  disabled={cantidad <= 1}
                >
                  -
                </button>
                <span>{cantidad}</span>
                <button
                  className="btn btn-secondary py-1 fw-semibold"
                  onClick={increase}
                  disabled={cantidad >= producto.stock}
                >
                  +
                </button>
              </div>



            </>
          ) : (
            <p className="text-danger">Sin stock</p>
          )}

        </div>

        <div className="card-footer border-0">
          <button
            className="btn btn-primary d-flex justify-content-center align-items-center mx-auto mt-auto mb-2 px-3"
            onClick={handleAdd2Cart}
          >
            Agregar <FontAwesomeIcon icon={faCartPlus} className="fs-5 ps-2" />
          </button>
        </div>

        <div className="card-footer border-0 pt-0 pb-4">
          <Link to={`/producto/${producto.id}`} className="small">Ver detalle</Link>
        </div>
      </div>
    </div>

  )
}

export default Product;
