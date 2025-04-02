import { useEffect, useState } from 'react';
import './ItemListContainer.css';
import Item from '../Item/Item';
import Loader from '../Loader/Loader';
import { fetchdata } from '../../fetchdata';
import ItemDetail from '../ItemDetail/ItemDetail';

function ItemListContainer () {
    const [loading, setLoading] = useState(true);
    const [todosLosProductos, SetTodosLosProductos] = useState(null);
    const [productoFiltrado, setProductoFiltrado] = useState(null);

    useEffect(() => {
        fetchdata(false)
        .then(resp => {
            SetTodosLosProductos (resp);
            setTimeout(() => {
                setLoading(false);
            }, 500);
        })
        .catch(err => console.log(err))
    },[]);

    return (
        loading ?
        <Loader />
        : 
        <div>
            <div className="productos-cont">
            {
                todosLosProductos.map(el => {
                    return (
                        <Item key={el.id} producto={el} productoFiltrado={setProductoFiltrado}/>
                    )
                })
            }
            </div>
            { 
            productoFiltrado && <ItemDetail producto={productoFiltrado} volverAInicio={()=> setProductoFiltrado(null)}/>
            }
        </div>
    );
};

export default ItemListContainer;