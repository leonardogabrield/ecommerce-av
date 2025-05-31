import React, { useContext } from 'react'
import './Cart.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '../context/CartContext'
const Cart = ({ isOpen, onClose, }) => {

    const { cart, deleteFromCart, } = useContext(CartContext)

    const handleFinalizarCompra = () => {
        alert("Compra realizada con éxito");
    }
    

    return (
        <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
            <div className='cart-header'>
                <h2 className="h4 text-black">Carrito de Compras</h2>
                <button onClick={onClose} className="btn btn-outline text-black">X</button>
            </div>

            <div className="container">

            <div className="cart-content">
                {cart.length === 0 ? (<p style={{ color: 'red' }}>Carrito vacío</p>) : (<><ul className='cart-item ps-3'>
                    {cart.map((item, index) => (

                        <li key={item.id} className="border-bottom border-secondary">
                            <p className="my-2">{item.title} ${item.price} - <small>Cant.: </small> {item.cantidad}
                            <a className="px-2 link-secondary" onClick={() => deleteFromCart(item)}><FontAwesomeIcon icon={faTrash} /></a></p>
                        </li>

                    ))}
                </ul>
                    <div className='cart-footer pt-2'>
                        <p className="text-primary lead fw-medium mb-4">Total: ${cart.reduce((total, item) => total + (item.price * item.cantidad), 0).toFixed(2)}</p>
                        <button className='btn btn-primary' onClick={handleFinalizarCompra} >Finalizar Compra</button>
                    </div>
                </>)}

            </div>
            </div>

        </div>
    )
}

export default Cart
