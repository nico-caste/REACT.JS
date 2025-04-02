import { useState } from 'react';
import ItemCount from '../ItemCount/ItemCount';
import './ItemDetail.css';

function ItemDetail ({producto, volverAInicio}) {
    const {nombre,descripcion,marca,categoria,precioARS,precioUSD,stock} = producto;
    const [contador, setContador] = useState(1);

    function agregarACarrito (prod){
        // const nuevoProd = {
        //     ...prod,
        //     cantidad: contador,
        // };
        console.log("vas a agregar",{...prod, cantidad: contador})
        setContador(1)
    };

    return (
        <div className="card">
            <h3 className="card-head">{nombre}</h3>
            <h4 className="">{marca}</h4>
            <div className="card-body"> 
                <h5 className="">Precio: ${precioARS} / U${precioUSD}</h5>
                <p className="">{descripcion} ({categoria})</p>
                <p className="">{stock} unidades disponibles</p>
                <ItemCount stock={stock} contador={contador} setContador={setContador}/>
                <button className="btn btn-secondary" onClick={()=> agregarACarrito(producto)}>Agregar al carrito</button>
                <br/>
                <button className="btn btn-secondary" onClick={volverAInicio}>Volver al inicio</button>
            </div>
        </div>
    );
};

export default ItemDetail;