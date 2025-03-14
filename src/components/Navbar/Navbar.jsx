import CartWidget from '../CartWidget/CartWidget';
import './Navbar.css';

function Navbar() {

  return (
    <header>
        <nav>
            <ul>
              <p>LOGO</p>
              <li>Inicio</li>
              <li>Productos</li>
              <li>Contacto</li>
              <CartWidget />
            </ul>
        </nav>
    </header>
  );
};

export default Navbar
