import { useEffect, useState } from 'react';
import './ItemListContainer.css';
import Item from '../Item/Item';
import Loader from '../Loader/Loader';
import { fetchdata } from '../../fetchdata';
import { useParams } from 'react-router';
import { db } from '../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

function ItemListContainer () {
    const [loading, setLoading] = useState(true);
    const [todosLosProductos, SetTodosLosProductos] = useState(null);
    const {categoria} = useParams();
    const prodCollection = collection(db, "productos");

    useEffect(() => {
        getDocs(prodCollection).then (snapshot => {
            let arrayProd = snapshot.docs.map(el => el.data());
            console.log(arrayProd);
        })
        .catch (err => console.error(err));

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