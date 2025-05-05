import './CartWidget.css';
import { FaCartPlus } from 'react-icons/fa';
import { useAppContext } from '../../context/context.jsx';

function CartWidget () {
    const {cart} = useAppContext();
    return (
        <p><FaCartPlus />{cart.length}</p>
    )
};

export default CartWidget;