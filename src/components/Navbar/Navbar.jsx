import { Link } from 'react-router-dom';
import './Navbar.scss';
import Cart from '../Cart/Cart';
import { IoHomeOutline, IoCartOutline, IoReceiptOutline } from "react-icons/io5";

function Navbar() {
  return (
    <header>
      <nav>
        <ul className="nav-bar-items">
          <li>
            <Link to="/ordenes" aria-label="Ver órdenes">
              <IoReceiptOutline size={28} />
            </Link>
          </li>
          <li>
            <Link to="/" aria-label="Inicio">
              <IoHomeOutline size={28} />
            </Link>
          </li>
          <li>
            <Cart />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;