import { Link } from 'react-router';
import './Item.css';

function Item ({producto}) {
    const {id,nombre,stock} = producto;

    return (
        <div className="card">
        <h3 className="card-head">{nombre}</h3>
        <p className="">{stock} unidades disponibles</p>
        <button className="btn btn-secondary" onClick={()=> console.log("Agregar ",producto)}>Agregar al carrito</button>
        <Link to={`/detalle/${id}`}>
            <button className="btn btn-secondary" >Ver detalle</button>
        </Link>
        </div>
    );
};

export default Item;