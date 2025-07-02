import React, { useState, useEffect } from 'react';

function FormEdicion({ productoSeleccionado, onUpdate }) {
    const [producto, setProducto] = useState(productoSeleccionado);

    useEffect(()=>{
        setProducto(productoSeleccionado)
    },[productoSeleccionado])

     const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'images') {
            setProducto({ ...producto, images: value.split(',').map(url => url.trim()) });
        } else {
            setProducto({ ...producto, [name]: value });
        }
    };

    return (
        <form onSubmit={(e)=>{
            e.preventDefault()
            onUpdate(producto)
        }}>
            <h2>Editar Producto</h2>
            <div className="mb-3">
                <label className="form-label">ID:</label>
                <input className="form-control"
                    type="number"
                    name="id"
                    value={producto.id || ''}
                    onChange={handleChange}
                    readOnly
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Nombre:</label>
                <input className="form-control"
                    type="text"
                    name="title"
                    value={producto.title || ''}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Descripción:</label>
                <input className="form-control"
                    type="text"
                    name="description"
                    value={producto.description || ''}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Precio:</label>
                <input className="form-control"
                    type="number"
                    name="price"
                    value={producto.price || ''}
                    onChange={handleChange}
                    required
                    min="0"
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Stock:</label>
                <input className="form-control"
                    type="number"
                    name="stock"
                    value={producto.stock || ''}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Imágenes URLs:</label>
                <input className="form-control"
                    type="text"
                    name="images"
                    value={producto.images.join(', ')}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label className="form-label">SKU:</label>
                <input className="form-control"
                    type="text"
                    name="sku"
                    value={producto.sku || ''}
                    onChange={handleChange}
                    required
                />
            </div>

            <button type="submit" className="btn btn-primary">Actualizar</button>
        </form>
    );
}
export default FormEdicion;