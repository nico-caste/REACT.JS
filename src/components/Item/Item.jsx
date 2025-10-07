import { Link } from 'react-router-dom';
import { useAppContext  } from '../../context/context';
import './Item.scss';
import Swal from 'sweetalert2';

function Item({ producto }) {
    const { id, nombre, stock, precioARS, precioUSD } = producto;
    const { addToCart, cart } = useAppContext();

    const itemInCart = cart.find(item => item.id === id);
    const quantityInCart = itemInCart ? itemInCart.cantidad : 0;

    const itemAddToCart = () => {
        if (quantityInCart < stock) {
            addToCart(producto, 1);
            Swal.fire({
                title: '¡Producto agregado!',
                text: `Se ha añadido 1 ${nombre} al carrito`,
                icon: 'success',
                timer: 2000,
                toast: true,
                position: 'bottom-end',
                showConfirmButton: false
            });
        }
    };

    const isButtonDisabled = stock === 0 || quantityInCart >= stock;

    return (
        <div className="card">
            <Link to={`/detalle/${id}`}>
                <h3 className="card-head">{nombre}</h3>
            </Link>
            <h5>${precioARS} ( U${precioUSD} )</h5>
            <p className="">{stock} unidades disponibles</p>
            <Link to={`/detalle/${id}`}>
                <button className="btn btn-secondary">Ver detalle</button>
            </Link>
            <button
                className="btn btn-secondary"
                onClick={itemAddToCart}
                disabled={isButtonDisabled}
            >
                {stock === 0 ? 'Sin stock' : (quantityInCart >= stock ? 'Sin stock' : 'Agregar al carrito')}
            </button>
        </div>
    );
};

export default Item;