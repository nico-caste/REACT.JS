import { FaCartPlus } from 'react-icons/fa';
import { useAppContext } from '../../context/context.jsx';
import { useNavigate } from 'react-router-dom';
import './Cart.scss';

function Cart() {
    const { cart = [] } = useAppContext();
    const navigate = useNavigate();
    const itemCount = cart.reduce((total, item) => total + item.cantidad, 0);
    
    const cartClick = () => {
        navigate('/cart');
    };

    return (
        <div 
            className={`cart-widget ${itemCount === 0 ? 'empty' : ''}`}
            onClick={cartClick}
            aria-label="Carrito de compras"
            role="button"
            tabIndex="0"
        >
            <FaCartPlus className="cart-icon" aria-hidden="true" />
            {itemCount > 0 && (
                <span className="cart-badge" aria-live="polite">
                    {itemCount}
                </span>
            )}
        </div>
    );
};

export default Cart;