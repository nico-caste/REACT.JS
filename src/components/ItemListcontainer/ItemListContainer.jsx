import { useEffect, useState } from 'react';
import './ItemListContainer.css';
import Item from '../Item/Item';
import Loader from '../Loader/Loader';
import { fetchdata } from '../../fetchdata';
import { useParams } from 'react-router';

function ItemListContainer () {
    const [loading, setLoading] = useState(true);
    const [todosLosProductos, SetTodosLosProductos] = useState(null);
    const {categoria} = useParams();


    useEffect(() => {
        if(!todosLosProductos){
            fetchdata(false)
            .then(resp => {
                SetTodosLosProductos (resp);
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            })
            .catch(err => console.log(err))

        };
    },[categoria]);

    return (
        loading ?
        <Loader />
        : 
        <div>
            <div className="productos-cont">
            {
                categoria ?
                todosLosProductos.filter (el=>el.categoria ===categoria).map(el => {
                    return (
                        <Item key={el.id} producto={el}/>
                    )
                })
                :
                todosLosProductos.map(el => {
                    return (
                        <Item key={el.id} producto={el}/>
                    )
                })
            }
            </div>
        </div>
    );
};

export default ItemListContainer;