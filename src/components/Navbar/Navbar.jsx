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
                  <li>Inicio</li>
                </Link>
                <Link to="/categoria/SmartTV">
                  <li>SmartTV</li>
                </Link>
                <Link to="/categoria/Smartphone">
                  <li>Smartphone</li>
                </Link>
                <CartWidget />
            </ul>
        </nav>
    </header>
  );
};

export default Navbar
