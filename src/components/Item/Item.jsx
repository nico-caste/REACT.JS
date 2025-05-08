import { Link } from 'react-router';
import { useAppContext  } from '../../context/context';
import { useState } from 'react';
import './Item.css';
import Swal from 'sweetalert2';

function Item({ producto }) {
    const { id, nombre, stock, precioARS, precioUSD } = producto;
    const { addToCart } = useAppContext();
    const [currentStock, setCurrentStock] = useState(stock);
    // Agrgar al carrito desde Item
    const itemAddToCart = () => {
        if (currentStock > 0) {
            addToCart(producto, 1);
            setCurrentStock(prevStock => prevStock - 1);
            Swal.fire({
                title: '¡Producto agregado!',
                text: `Se ha añadido al carrito 1 ${nombre} `,
                icon: 'success',
                timer: 3000,
                timerProgressBar: true,
                toast: true,
                position: 'bottom-end',
                showConfirmButton: false
            });
        }
    };

    return (
        <div className="card">
            <h3 className="card-head">{nombre}</h3>
            <h5>${precioARS} / U${precioUSD}</h5>
            <p className="">{currentStock} unidades disponibles</p>
            <button 
                className="btn btn-secondary" 
                onClick={itemAddToCart}
                disabled={currentStock === 0}
            >
                {currentStock === 0 ? 'Sin stock' : 'Agregar al carrito'}
            </button>
            <Link to={`/detalle/${id}`}>
                <button className="btn btn-secondary">Ver detalle</button>
            </Link>
        </div>
    );
};

export default Item;