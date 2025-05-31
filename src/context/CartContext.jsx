import { createContext, useState, useEffect } from "react";

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([])
    const [productos, setProductos] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(false)
    const [isAuthenticated, setIsAuth] = useState(false)


    useEffect(() => {
    const fetchProducts = async () => {
        try {
            setCargando(true)
            setError(false) // Reset error state
            
            const res = await fetch('https://dummyjson.com/products')
            
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`)
            }
            
            const datos = await res.json()
            setProductos(datos.products)
            
        } catch (error) {
            console.error('Error cargando productos')
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
                // Incrementar cantidad existente
                return prevCart.map((item) =>
                    item.id === product.id
                        ? { ...item, cantidad: item.cantidad + (product.cantidad || 1) }
                        : item
                );
            } else {
                // Agregar nuevo producto
                return [...prevCart, { ...product, cantidad: product.cantidad || 1 }];
            }
        });
    };


    const handleDeleteFromCart = (product) => {
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

                { cart, productos, cargando, error, add2Cart, handleDeleteFromCart, isAuthenticated, setIsAuth }
            }>
            {children}
        </CartContext.Provider>
    )
}