import { Link } from 'react-router';
import './Navbar.css';
import Cart from '../Cart/Cart';
import { FaHome } from "react-icons/fa";
import { CgListTree } from "react-icons/cg";

function Navbar() {
  return (
    <header>
        <nav>
            <ul className="nav-bar-items">
                <Link to="/ordenes">
                <CgListTree />
                </Link>
                <Link to="/">
                  <FaHome />
                </Link>
                <Link to="/cart">
                <Cart />
                </Link>
            </ul>
        </nav>
        <nav className="navbar-cat">
          <ul>
            <p><strong>Categorias</strong></p>
            <Link to="/categoria/SmartTV">
              <li>SmartTV</li>
            </Link>
            <Link to="/categoria/Smartphone">
              <li>Smartphone</li>
            </Link>
            <Link to="/categoria/Laptop">
              <li>Laptop</li>
            </Link>
            <Link to="/categoria/Auriculares">
              <li>Auriculares</li>
            </Link>
            <Link to="/categoria/Tablet">
              <li>Tablet</li>
            </Link>
            <Link to="/categoria/Split">
              <li>Split</li>
            </Link>
          </ul>
        </nav>
    </header>
  );
};

export default Navbar;