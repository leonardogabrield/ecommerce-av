import React, { useContext } from 'react'
import './styleCart.css'
import { CartContext } from '../context/CartContext'
const Cart = ({ isOpen, onClose, }) => {

    const { cart, handleDeleteFromCart, } = useContext(CartContext)

    // console.log(cart);

    return (
        <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
            <div className='cart-header'>
                <h2 className="h4 text-black">Carrito de Compras</h2>
                <button onClick={onClose} className="btn btn-outline text-black">X</button>
            </div>

            <div className="container">

            <div className="cart-content">
                {cart.length === 0 ? (<p style={{ color: 'red' }}>El carrito esta vacío</p>) : (<><ul className='cart-item'>
                    {cart.map((item, index) => (

                        <li key={item.id} style={{ color: 'black' }}>
                            {item.id} - {item.title} - {item.price} - {item.cantidad}
                            <button className="btn btn-outline" onClick={() => handleDeleteFromCart(item)}><i className="fa-solid fa-trash"></i></button>
                        </li>

                    ))}
                </ul>
                    <div className='cart-footer'>
                        <p style={{ color: 'blue' }}>Total: ${cart.reduce((total, item) => total + (item.price * item.cantidad), 0)}</p>
                        <button className='btnCheckout'>Finalizar Compra</button>
                    </div>
                </>)}

            </div>
            </div>

        </div>
    )
}

export default Cart
