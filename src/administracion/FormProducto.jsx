import React, { useState } from 'react';

function FormProducto({ onAdd }) {

    const [producto, setProducto] = useState({
        title: '',
        description: '',
        price: '',
        stock: '',
        images: [],
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

        if (!producto.price || parseFloat(producto.price) <= 0 || isNaN(parseFloat(producto.price))) {
            nuevosErrores.price = 'El precio debe ser mayor a 0.';
        }

        if (!producto.description.trim()) {
            nuevosErrores.description = 'La descripción es obligatoria.';
        } else if (producto.description.trim().length < 10) {
            nuevosErrores.description = 'La descripción debe tener al menos 10 caracteres.';
        }

        if (producto.stock === '' || parseInt(producto.stock) < 0 || isNaN(parseInt(producto.stock))) {
            nuevosErrores.stock = 'El stock debe ser un número mayor o igual a 0.';
        }

        if (!producto.sku.trim()) {
            nuevosErrores.sku = 'El SKU es obligatorio.';
        }

        const validImages = producto.images.filter(img => img.trim() !== '');
        if (validImages.length === 0) {
            nuevosErrores.images = 'Debe proporcionar al menos una URL de imagen válida.';
        }

        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!checkFormulario()) {
            return;
        }
        onAdd(producto);
        setProducto({
            title: '',
            description: '',
            price: '',
            stock: '',
            images: [],
            sku: '',
        });

        setErrores({});
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Nombre:</label>
                <input className="form-control"
                    type="text" name="title" value={producto.title} onChange={handleChange} required />
                {errores.title && <div className="text-danger">{errores.title}</div>}
            </div>
            <div className="mb-3">
                <label className="form-label">Descripción:</label>
                <textarea className="form-control" rows="3"
                    type="text" name="description" value={producto.description} onChange={handleChange} required />
                {errores.description && <div className="text-danger">{errores.description}</div>}
            </div>
            <div className="mb-3">
                <label className="form-label">Precio:</label>
                <input className="form-control" type="number" name="price" value={producto.price} onChange={handleChange} required
                    min="0" />
                {errores.price && <div className="text-danger">{errores.price}</div>}
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
                {errores.stock && <div className="text-danger">{errores.stock}</div>}
            </div>
            <div className="mb-3">
                <label className="form-label">Imágenes URLs:</label>
                <input className="form-control"
                    type="text"
                    name="images"
                    value={producto.images.join(', ')}
                    onChange={handleChange}
                    required
                    placeholder="https://ejemplo.com/imagen1.jpg, https://ejemplo.com/imagen2.jpg"
                />
                {errores.images && <div className="text-danger">{errores.images}</div>}
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
                {errores.sku && <div className="text-danger">{errores.sku}</div>}
            </div>

            <button type="submit" className="btn btn-primary">Agregar</button>
        </form>
    );
}

export default FormProducto;