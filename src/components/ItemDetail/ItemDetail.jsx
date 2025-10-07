import { useParams, Link } from 'react-router-dom';
import Loader from '../Loader/Loader';
import ItemCount from '../ItemCount/ItemCount';
import './ItemDetail.scss';
import { useState, useMemo } from 'react';
import { useAppContext } from '../../context/context';
import Swal from 'sweetalert2';

function ItemDetail() {
    const { id } = useParams();
    const [contador, setContador] = useState(1);
    const { products, loading, addToCart, cart } = useAppContext();

    const producto = useMemo(() =>
        products.find(el => String(el.id) === id),
    [products, id]);

    const itemInCart = useMemo(() => cart.find(item => item.id === id), [cart, id]);
    const quantityInCart = itemInCart ? itemInCart.cantidad : 0;
    const availableStock = producto ? producto.stock - quantityInCart : 0;

    const itemDetailAddToCart = () => {
        if (producto && availableStock >= contador) {
            addToCart(producto, contador);
            setContador(1);
            Swal.fire({
                title: '¡Producto agregado!',
                text: `Se ha añadido al carrito ${contador} ${producto.nombre} `,
                icon: 'success',
                timer: 3000,
                timerProgressBar: true,
                toast: true,
                position: 'bottom-end',
                showConfirmButton: false
            });
        }
    };

    if (!producto) {
        return loading ? <Loader /> : <p>Producto no encontrado</p>;
    }
    const isButtonDisabled = availableStock === 0;

    return (
        loading ? <Loader /> :
            <div className="card-detail">
                <div className="card-detail-head">
                    <h3>{producto.nombre}</h3>
                    <h4>{producto.marca}</h4>
                    <p>{producto.descripcion} ({producto.categoria})</p>
                </div>
                <div className="card-detail-count">
                    <h5 className="">Precio: ${producto.precioARS} / U${producto.precioUSD}</h5>
                    <p className="">{producto.stock} unidades disponibles en total.</p>
                    {quantityInCart > 0 && <p><b>Ya tienes {quantityInCart} en el carrito.</b></p>}

                    <ItemCount
                        stock={availableStock}
                        contador={contador}
                        setContador={setContador}
                    />
                    <button
                        className="btn btn-secondary"
                        onClick={itemDetailAddToCart}
                        disabled={isButtonDisabled}>
                        {availableStock === 0 ? 'Sin stock' : 'Agregar al carrito'}
                    </button>
                </div>
                <div className="card-detail-btns">
                    <Link to="/">
                        <button className="btn btn-secondary">Volver al inicio</button>
                    </Link>
                    <Link to="/cart">
                        <button className="btn btn-secondary">Ver carrito</button>
                    </Link>
                </div>
            </div>
    );
}

export default ItemDetail;