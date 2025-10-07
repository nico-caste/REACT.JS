import { createContext, useContext, useState, useEffect } from 'react';
import { getProducts } from '../services/firebaseServices';
import Swal from 'sweetalert2';

const AppContext = createContext();

export function AppProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const productos = await getProducts();
                setProducts(productos);
                const uniqueCategories = [...new Set(productos.map(p => p.categoria))].sort();
                setCategories(uniqueCategories);
                const uniqueBrands = [...new Set(productos.map(p => p.marca))].sort();
                setBrands(uniqueBrands);
            } catch (error) {
                console.error("Error loading products:", error);
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, []);

    const addToCart = (producto, quantity = 1) => {
        if (!producto || !producto.id) {
        console.error("Error: Se intentó agregar un producto inválido al carrito.", producto);
        return;
        }
        
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === producto.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === producto.id
                        ? { ...item, cantidad: item.cantidad + quantity }
                        : item
                );
            }
            return [...prevCart, { ...producto, cantidad: quantity }];
        });
    };

    const removeFromCart = (id) => {
        setCart(prevCart => prevCart.filter(item => item.id !== id));
        Swal.fire({
            title: '¡Producto eliminado!',
            icon: 'warning',
            timer: 2500,
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false
        });
    };
    
    const clearCart = () => {
        setCart([]);
    };
    
    const updateQuantity = (id, newQuantity) => {
        setCart(prevCart =>
            prevCart.map(item =>
                item.id === id ? { ...item, cantidad: newQuantity } : item
            )
        );
    };

    const refreshProducts = async () => {
        setLoading(true);
        const updatedProducts = await getProducts();
        setProducts(updatedProducts);
        setLoading(false);
    }
    
    return (
        <AppContext.Provider value={{ 
            cart, 
            products,
            loading,
            categories,
            brands,
            addToCart, 
            removeFromCart, 
            updateQuantity,
            clearCart,
            refreshProducts
        }}>
            {children}
        </AppContext.Provider>
    );
};

export function useAppContext() {
    return useContext(AppContext);
};