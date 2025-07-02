import { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
export const AdminContext = createContext()

export const AdminProvider = ({ children }) => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false)
    const [seleccionado, setSeleccionado] = useState(null)
    const [openEditor, setOpenEditor] = useState(false)
    const apiUrl = 'https://68646e895b5d8d03397d3426.mockapi.io/api/productos'


    useEffect(() => {
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                setTimeout(() => {
                    setProductos(data);
                    setLoading(false);
                }, 2000);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setError(true);
                setLoading(false);
            });
    }, []);

    const cargarProductos = async () => {
        try {
            const res = await fetch(apiUrl)
            const data = await res.json()
            setProductos(data)
        } catch (error) {
            console.log('Error al cargar productos ', error);

        }
    }

    const agregarProducto = async (producto) => {
        try {
            const res = await fetch('https://68646e895b5d8d03397d3426.mockapi.io/api/productos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(producto)
            })
            if (!res.ok) {
                throw new Error('Error al agregar producto')
            }
            const data = await res.json()
            Swal.fire({
                title: ":)!",
                text: "Producto agregado correctamente!",
                icon: "success"
            });
            cargarProductos()
            setOpen(false)
        } catch (error) {
            console.log(error.message);

        }
    }

    const actulizarProducto = async (producto) => {
        try {
            const res = await fetch(`${apiUrl}/${producto.id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(producto)
                })
            if (!res.ok) throw Error('Error al actualizar el producto')
            const data = await res.json()
            alert('Producto actualizado correctamente')
            setOpenEditor(false)
            setSeleccionado(null)
            cargarProductos()
        } catch (error) {
            console.log(error.message);

        }
    }

    const eliminarProducto = async (id) => {
        const confirmar = window.confirm('Estas seguro de eliminar el producto?')
        if (confirmar) {
            try {
                const res = await fetch(`https://68646e895b5d8d03397d3426.mockapi.io/api/productos/${id}`, {
                    method: 'DELETE',
                })
                if (!res.ok) throw Error('Error al eliminar')
                
                Swal.fire({
                    title: ":(!",
                    text: "Producto Eliminado correctamente!",
                    icon: "error"
                });
                cargarProductos()
            } catch (error) {
                alert('Hubo un problema al eliminar el producto')
            }
        }
    }

    return (
        <AdminContext.Provider value={{
            productos,
            loading,
            open,
            setOpen,
            openEditor,
            setOpenEditor,
            seleccionado,
            setSeleccionado,
            agregarProducto,
            actulizarProducto,
            eliminarProducto,
        }}>
            {children}
        </AdminContext.Provider>
    )
}