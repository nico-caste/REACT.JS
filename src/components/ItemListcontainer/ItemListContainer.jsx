import './ItemListContainer.scss';
import Item from '../Item/Item';
import Loader from '../Loader/Loader';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../../context/context';
import { useMemo, useState, useEffect } from 'react';
import ProductFilters from '../ProductFilters/ProductFilters';

function ItemListContainer() {
    const { products, loading, categories, brands } = useAppContext();
    const { categoria: routeCategory } = useParams();
    const [selectedCategory, setSelectedCategory] = useState(routeCategory || '');
    const [selectedBrand, setSelectedBrand] = useState('');

    useEffect(() => {
        setSelectedCategory(routeCategory || '');
    }, [routeCategory]);
    
    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const categoryMatch = selectedCategory ? product.categoria === selectedCategory : true;
            const brandMatch = selectedBrand ? product.marca === selectedBrand : true;
            return categoryMatch && brandMatch;
        });
    }, [products, selectedCategory, selectedBrand]);

    if (loading) {
        return <Loader />;
    }

    return (
        loading ?
        <Loader />
        : 
        <div>
                <ProductFilters 
                    categories={categories}
                    brands={brands}
                    onCategoryChange={setSelectedCategory}
                    onBrandChange={setSelectedBrand}
                />
                
                <div className="productos-cont">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map(el => (
                            <Item key={el.id} producto={el} />
                        ))
                    ) : (
                        <p>No se encontraron productos con los filtros seleccionados.</p>
                    )}
                </div>
        </div>
    );
};

export default ItemListContainer;