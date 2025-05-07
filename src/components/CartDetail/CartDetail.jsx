import { Link } from 'react-router';
import { useAppContext } from '../../context/context';
import './CartDetail.css';

function CartDetail() {
    const { cart, removeFromCart, updateQuantity } = useAppContext();
    const totalARS = cart.reduce((sum, item) => sum + (item.precioARS * item.cantidad), 0);
    const totalUSD = cart.reduce((sum, item) => sum + (item.precioUSD * item.cantidad), 0);
    
    const handleQuantityChange = (id, oldQuantity, newQuantity) => {
        if (newQuantity > 0) {
            updateQuantity(id, oldQuantity, newQuantity);
        } else {
            removeFromCart(id, oldQuantity);
        }
    };

    return (
        <div className="cart-page">
            <h1>Tu Carrito</h1>
            {cart.length === 0 ? (
                <div className="empty-cart">
                    <p>Tu carrito está vacío</p>
                    <Link to="/" className="continue-shopping">
                        Continuar comprando
                    </Link>
                </div>
            ) : (
                <>
                    <div className="cart-items">
                        {cart.map(item => (
                            <div key={item.id} className="cart-item">
                                <img src={item.image} alt={item.nombre} />
                                <div className="item-details">
                                    <h3>{item.nombre}</h3>
                                    <p>Precio unitario: ${item.precioARS.toFixed(2)} / U${item.precioUSD}</p>
                                    <div className="quantity-control">
                                        <button 
                                            onClick={() => handleQuantityChange(item.id, item.cantidad, item.cantidad - 1)}
                                            disabled={item.cantidad <= 1}
                                        >
                                            -
                                        </button>
                                        <span>{item.cantidad}</span>
                                        <button 
                                            onClick={() => handleQuantityChange(item.id, item.cantidad, item.cantidad + 1)}
                                            disabled={item.cantidad >= item.stock} // Usar stock original del producto
                                        >
                                            +
                                        </button>
                                    </div>
                                    <p>Subtotal: ${(item.precioARS * item.cantidad).toFixed(2)} / U${(item.precioUSD * item.cantidad).toFixed(2)}</p>
                                </div>
                                <button 
                                    onClick={() => removeFromCart(item.id, item.cantidad)}
                                    className="remove-item"
                                    aria-label={`Eliminar ${item.nombre} del carrito`}
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="cart-summary">
                        <h2>Resumen</h2>
                        <p>Total: ${totalARS.toFixed(2)} / U${totalUSD.toFixed(2)}</p>
                        <button className="checkout-button">
                            Proceder al pago
                        </button>
                        <Link to="/" className="continue-shopping">
                            Seguir comprando
                        </Link>
                    </div>
                </>
            )}
        </div>
    )
}

export default CartDetail;