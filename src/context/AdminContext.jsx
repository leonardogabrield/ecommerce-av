import { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
export const AdminContext = createContext()

export const AdminProvider = ({ children }) => {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [open, setOpen] = useState(false)
    const [seleccionado, setSeleccionado] = useState(null)
    const [openEditor, setOpenEditor] = useState(false)
    const apiUrl = 'https://68646e895b5d8d03397d3426.mockapi.io/api/productos'


    useEffect(() => {
        fetch(apiUrl)
            .then((res) => res.json())
            .then((data) => {
                setTimeout(() => {
                    setProductos(data);
                    setCargando(false);
                }, 2000);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setError(true);
                setCargando(false);
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

    const addProducto = async (producto) => {
        try {
            const res = await fetch(apiUrl, {
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
                title: "Producto Agregado",
                text: "El producto se ha agregado correctamente!",
                icon: "success",
                confirmButtonColor: "#0d6efd",
            });
            cargarProductos()
            setOpen(false)
        } catch (error) {
            console.log(error.message);
            Swal.fire({
                title: "Error",
                text: "Hubo un problema al agregar el producto",
                icon: "error",
                confirmButtonColor: "#0d6efd",
            });

        }
    }

    const updateProducto = async (producto) => {
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
            Swal.fire({
                title: "Producto Actualizado",
                text: "El producto se ha actualizado correctamente!",
                icon: "success",
                confirmButtonColor: "#0d6efd",
            });
            setOpenEditor(false)
            setSeleccionado(null)
            cargarProductos()
        } catch (error) {
            console.log(error.message);
            Swal.fire({
                title: "Error",
                text: "Hubo un problema al actualizar el producto",
                icon: "error",
                confirmButtonColor: "#0d6efd",
            });

        }
    }

    const removeProducto = async (id) => {
 
        const confirmar = await Swal.fire({
            title: '¿Está seguro de eliminar el producto?',
            text: "¡No podrás revertir esta acción!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: "#0d6efd",
        });

        if (confirmar.isConfirmed) {
            try {
                const res = await fetch(`${apiUrl}/${id}`, {
                    method: 'DELETE',
                })
                if (!res.ok) throw Error('Error al eliminar')

                Swal.fire({
                    title: "Producto Eliminado",
                    text: "El producto se ha eliminado correctamente!",
                    confirmButtonColor: "#0d6efd",
                });
                cargarProductos()
            } catch (error) {
                Swal.fire({
                    title: "Error",
                    text: "Hubo un problema al eliminar el producto",
                    icon: "error",
                    confirmButtonColor: "#0d6efd",
                });
            }
        }
    }

    return (
        <AdminContext.Provider value={{
            productos,
            cargando,
            open,
            openEditor,
            seleccionado,
            setOpen,
            setOpenEditor,
            setSeleccionado,
            addProducto,
            updateProducto,
            removeProducto,
        }}>
            {children}
        </AdminContext.Provider>
    )
}