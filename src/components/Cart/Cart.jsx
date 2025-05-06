import { FaCartPlus } from 'react-icons/fa';
import { useAppContext } from '../../context/context.jsx';
import './Cart.css';
import { useNavigate } from 'react-router';

// function Cart () {
//     const {cart} = useAppContext();
//     return (
//         <p><FaCartPlus />{cart.length}</p>
//     )
// };

// export default Cart;

function Cart() {
    const { cart = [] } = useAppContext();
    const cartNav = useNavigate();
    const itemCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);
    
    const cartClick = () => {
        if (itemCount > 0) {
            cartNav('/cart');
        }
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
    )
}

export default Cart;