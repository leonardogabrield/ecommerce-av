import React, { useState } from 'react';

function FormProducto({ onAdd }) {
    const [producto, setProducto] = useState({
        title: '',
        description: '',
        price: '',
        stock: '',
        images: [''],
        sku: '',
    });
    const [errores, setErrores] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'images') {
            setProducto({ ...producto, images: value.split(',').map(url => url.trim()) });
        } else {
            setProducto({ ...producto, [name]: value });
        }
    };


    const checkFormulario = () => {
        const nuevosErrores = {};
        if (!producto.title.trim()) {
            nuevosErrores.title = 'El nombre es obligatorio.';
        }
        if (!producto.price || producto.precio <= 0) {
            nuevosErrores.price = 'El precio debe ser mayor a 0.';
        }
        if (!producto.description.trim()) {
            nuevosErrores.description = 'La descripción es obligatoria';
        }
        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!checkFormulario()) {
            return;
        }
        onAdd(producto); // Llamada a la función para agregar el producto
        setProducto({
            title: '',
            description: '',
            price: '',
            stock: '',
            images: [''],
            sku: '',
        }); // Limpiar el formulario
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Agregar Producto</h2>
            <div className="mb-3">
                <label className="form-label">Nombre:</label>
                <input className="form-control"
                    type="text" name="title" value={producto.title} onChange={handleChange} required />
                {errores.title && <p style={{ color: 'red' }}>{errores.title}</p>}
            </div>
            <div className="mb-3">
                <label className="form-label">Descripción:</label>
                <input className="form-control"
                    type="text" name="description" value={producto.description} onChange={handleChange} required />
                {errores.description && <p style={{ color: 'red' }}>{errores.description}</p>}
            </div>
            <div className="mb-3">
                <label className="form-label">Precio:</label>
                <input className="form-control" type="number" name="price" value={producto.price} onChange={handleChange} required
                    min="0" />
                {errores.price && <p style={{ color: 'red' }}>{errores.price}</p>}
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
                {errores.stock && <p style={{ color: 'red' }}>{errores.stock}</p>}
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
                {errores.images && <p style={{ color: 'red' }}>{errores.images}</p>}
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
                {errores.sku && <p style={{ color: 'red' }}>{errores.sku}</p>}
            </div>

            <button type="submit" className="btn btn-primary">Agregar</button>
        </form>
    );
}

export default FormProducto;