import { createContext, useState, useEffect } from "react";
import Swal from "sweetalert2";

export const CartContext = createContext()

export const CartProvider = ({ children }) => {

    const [cart, setCart] = useState([])
    const [productos, setProductos] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setCargando(true)
                setError(false)

                const res = await fetch('https://dummyjson.com/products')

                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`)
                }

                const datos = await res.json()
                setProductos(datos.products)

            } catch (error) {
                Swal.fire({
                    title: 'Error en la carga',
                    text: 'Error cargando los productos',
                    icon: 'error',
                    confirmButtonColor: "#0d6efd",
                });
                setError(true)
                setProductos([])
            } finally {
                setCargando(false)
            }
        }

        fetchProducts()
    }, [])

    const add2Cart = (product) => {
        setCart(prevCart => {
            const productInCart = prevCart.find((item) => item.id === product.id);

            if (productInCart) {
                return prevCart.map((item) =>
                    item.id === product.id
                        ? { ...item, cantidad: item.cantidad + (product.cantidad || 1) }
                        : item
                );
            } else {
                return [...prevCart, { ...product, cantidad: product.cantidad || 1 }];
            }
        });

        Swal.fire({
            title: 'Producto Agregado',
            text: `¡${product.title || 'El producto'} se ha agregado correctamente al carrito!`,
            icon: 'success',
            confirmButtonColor: "#0d6efd",
        });
    };


    const deleteFromCart = (product) => {
        setCart(prevCart => {
            return prevCart
                .map(item => {
                    if (item.id === product.id) {
                        return item.cantidad > 1
                            ? { ...item, cantidad: item.cantidad - 1 }
                            : null;
                    }
                    return item;
                })
                .filter(Boolean);
        });
    };

    return (
        <CartContext.Provider
            value={

                { cart, productos, cargando, error, add2Cart, deleteFromCart }
            }>
            {children}
        </CartContext.Provider>
    )
}