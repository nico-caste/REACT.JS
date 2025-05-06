import { Link } from 'react-router';
import { useAppContext } from '../../context/context';
import './CartDetail.css';

function CartDetail() {
    const { cart, removeFromCart, updateQuantity } = useAppContext();
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const quantityChange = (id, newQuantity) => {
        if (newQuantity > 0) {
            updateQuantity(id, newQuantity);
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
                                <img src={item.image} alt={item.name} />
                                <div className="item-details">
                                    <h3>{item.name}</h3>
                                    <p>Precio unitario: ${item.price.toFixed(2)}</p>
                                    <div className="quantity-control">
                                        <button 
                                            onClick={() => quantityChange(item.id, item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                        >
                                            -
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => quantityChange(item.id, item.quantity + 1)}>
                                            +
                                        </button>
                                    </div>
                                    <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                                <button 
                                    onClick={() => removeFromCart(item.id)}
                                    className="remove-item"
                                    aria-label={`Eliminar ${item.name} del carrito`}
                                >
                                    ×
                                </button>
                            </div>
                        ))};
                    </div>
                    <div className="cart-summary">
                        <h2>Resumen</h2>
                        <p>Total: ${total.toFixed(2)}</p>
                        <button className="checkout-button">
                            Proceder al pago
                        </button>
                        <Link to="/" className="continue-shopping">
                            Seguir comprando
                        </Link>
                    </div>
                </>
            )};
        </div>
    );
};

export default CartDetail;