import { Link, useParams } from 'react-router';
import Loader from '../Loader/Loader';
import ItemCount from '../ItemCount/ItemCount';
import './ItemDetail.css';
import { useState } from 'react';
import { useAppContext } from '../../context/context';

function ItemDetail() {
    const { id } = useParams();
    const [contador, setContador] = useState(1);
    const { products, loading, addToCart } = useAppContext();
    const producto = products.find(el => String(el.id) === String(id));

    const itemDetailAddToCart = () => {
        if (producto && producto.stock >= contador) {
            addToCart(producto, contador);
            setContador(1);
        }
    };

    return (
        loading ? <Loader /> :
            <div className="card">
                {
                    producto ?
                        <>
                            <p>{producto.nombre}</p>
                            <h3 className="card-head">{producto.nombre}</h3>
                            <h4 className="">{producto.marca}</h4>
                            <div className="card-body">
                                <h5 className="">Precio: ${producto.precioARS} / U${producto.precioUSD}</h5>
                                <p className="">{producto.descripcion} ({producto.categoria})</p>
                                <p className="">{producto.stock} unidades disponibles</p>
                                <ItemCount 
                                    stock={producto.stock} 
                                    contador={contador} 
                                    setContador={setContador}
                                />
                                <button 
                                    className="btn btn-secondary" 
                                    onClick={itemDetailAddToCart}
                                    disabled={producto.stock === 0 || contador > producto.stock}
                                >
                                    {producto.stock === 0 ? 'Sin stock' : 'Agregar al carrito'}
                                </button>
                                <br />
                                <Link to="/">
                                    <button className="btn btn-secondary">Volver al inicio</button>
                                </Link>
                                <Link to="/cart">
                                    <button className="btn btn-secondary">Ver carrito</button>
                                </Link>
                            </div>
                        </>
                        :
                        <p>Producto no encontrado</p>
                }
            </div>
    );
}

export default ItemDetail;