import { useState } from 'react';
import { addProduct } from '../../services/firebaseServices';
import Swal from 'sweetalert2';
import './ProductManager.scss';

const ProductManager = () => {
    const [product, setProduct] = useState({
        nombre: '', marca: '', descripcion: '', img: '', categoria: 'SmartTV',
        precioARS: 0, precioUSD: 0, stock: 0
    });

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setProduct(prev => ({
            ...prev,
            [name]: type === 'number' ? parseFloat(value) : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newProductId = await addProduct(product);
            Swal.fire('¡Éxito!', `Producto "${product.nombre}" agregado con ID: ${newProductId}`, 'success');
            e.target.reset();
            setProduct({
                nombre: '', marca: '', descripcion: '', img: '', categoria: '',
                precioARS: 0, precioUSD: 0, stock: 0
            });
        } catch (error) {
            Swal.fire('Error', `No se pudo agregar el producto (${error.message})`, 'error');
        }
    };

    return (
        <div>
            <h2>Cargar Nuevo Producto</h2>
            <form onSubmit={handleSubmit} className="product-form">
                <input type="text" name="nombre" placeholder="Nombre del producto" onChange={handleChange} required />
                <input type="text" name="marca" placeholder="Marca" onChange={handleChange} required />
                <textarea name="descripcion" placeholder="Descripción" onChange={handleChange} required />
                <input type="url" name="img" placeholder="URL de la Imagen" onChange={handleChange} required />
                <select name="categoria" value={product.categoria} onChange={handleChange}>
                    <option value="SmartTV">SmartTV</option>
                    <option value="Smartphone">Smartphone</option>
                    <option value="Laptop">Laptop</option>
                    <option value="Auriculares">Auriculares</option>
                    <option value="Tablet">Tablet</option>
                    <option value="Split">Split</option>
                </select>
                <input type="number" name="precioARS" placeholder="Precio ARS" onChange={handleChange} required />
                <input type="number" name="precioUSD" placeholder="Precio USD" onChange={handleChange} required />
                <input type="number" name="stock" placeholder="Stock" onChange={handleChange} required />
                <button type="submit" className="btn-secondary">Agregar Producto</button>
            </form>
        </div>
    );
};
export default ProductManager;