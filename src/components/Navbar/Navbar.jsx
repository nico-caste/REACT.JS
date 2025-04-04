import { Link } from 'react-router';
import CartWidget from '../CartWidget/CartWidget';
import './Navbar.css';

function Navbar() {

  return (
    <header>
        <nav>
            <ul className="nav-bar-items">
                <p>LOGO</p>
                <Link to="/">
                  <li><strong>Inico</strong></li>
                </Link>

                <CartWidget />
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

export default Navbar
