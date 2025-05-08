import './ItemListContainer.css';
import Item from '../Item/Item';
import Loader from '../Loader/Loader';
import { useParams } from 'react-router';
import { useAppContext } from '../../context/context';

function ItemListContainer() {
    const { categoria } = useParams();
    const { products, loading } = useAppContext();

    return (
        loading ?
        <Loader />
        : 
        <div>
            <div className="productos-cont">
            {
                categoria ?
                products.filter(el => el.categoria === categoria).map(el => (
                    <Item key={el.id} producto={el}/>
                ))
                :
                products.map(el => (
                    <Item key={el.id} producto={el}/>
                ))
            }
            </div>
        </div>
    );
};

export default ItemListContainer;