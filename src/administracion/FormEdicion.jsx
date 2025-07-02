import React, { useState, useEffect } from 'react';

function FormEdicion({ productoSeleccionado, onUpdate }) {
    const [producto, setProducto] = useState(productoSeleccionado);

    useEffect(() => {
        setProducto(productoSeleccionado)
    }, [productoSeleccionado])



    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'images') {
            setProducto({ ...producto, images: value.split(',').map(url => url.trim()) });
        } else {
            setProducto({ ...producto, [name]: value });
        }
    };

    const handleSubmit = (e) => {

        e.preventDefault();

        if (!producto.title || !producto.description || !producto.price || !producto.sku) {
            alert('Por favor completa todos los campos requeridos');
            return;
        }

        if (producto.price < 0) {
            alert('El precio no puede ser negativo');
            return;
        }

        onUpdate(producto);
    };

    if (!producto) {
        return <div className="text-center">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">cargando...</span>
            </div>
        </div>;
    }

    return (
        <form onSubmit={handleSubmit}>

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
                <textarea className="form-control" rows="3"
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
                    placeholder="https://ejemplo1.com, https://ejemplo2.com"
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