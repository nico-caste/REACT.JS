import './itemCount.scss';

function ItemCount ({stock,contador,setContador}) {
    function modificarContador (operacion) {
        if (operacion === "+") {
            if (contador < stock) {
                setContador (contador+1)
            };
        } else {
            if (contador > 1) {
                setContador ((contador - 1))
            };
        };
    };

    return (
        <div className="contador-cont">
            <div className="btn btn-secondary"onClick={()=> modificarContador("-")}>-</div>
            <p><strong>{contador}</strong></p>
            <div className="btn btn-secondary"onClick={()=> modificarContador("+")}>+</div>
        </div>

    );
};

export default ItemCount;