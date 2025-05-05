import { Link } from 'react-router';
import './Item.css';
import { useAppContext } from '../../context/context';

function Item ({producto}) {
    const {id,nombre,stock} = producto;
    const {agregarACarrito} = useAppContext();

    // function agregarACarrito (prod){
    //     const nuevoProd = {
    //         ...prod,
    //         cantidad: 1,
    //     };
    //     console.log("Estas agregando",nuevoProd)
    // };

    return (
        <div className="card">
        <h3 className="card-head">{nombre}</h3>
        <p className="">{stock} unidades disponibles</p>
        <button className="btn btn-secondary" onClick={()=> agregarACarrito(producto,1)}>Agregar al carrito</button>
        <Link to={`/detalle/${id}`}>
            <button className="btn btn-secondary" >Ver detalle</button>
        </Link>
        </div>
    );
};

export default Item;