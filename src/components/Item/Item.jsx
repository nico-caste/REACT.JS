import './Item.css';

function Item ({producto, productoFiltrado}) {
    const {nombre,categoria,stock} = producto;

    return (
        <div className="card">
        <h3 className="card-head">{nombre}</h3>
        <p className="">{stock} unidades disponibles</p>
        <button className="btn btn-secondary" onClick={()=> console.log("Agregar ",producto)}>Agregar al carrito</button>
        <button className="btn btn-secondary" onClick={()=> productoFiltrado(producto)}>Ver detalle</button>
        </div>
    );
};

export default Item;