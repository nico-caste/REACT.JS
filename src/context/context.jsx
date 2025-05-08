import { createContext, useContext, useState, useEffect } from 'react';
import { fetchdata } from '../fetchdata';

const AppContext = createContext();

export function AppProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    // Cargar productos al iniciar
    useEffect(() => {
        const loadProducts = async () => {
            try {
                const productos = await fetchdata();
                setProducts(productos);
                setLoading(false);
            } catch (error) {
                console.error("Error loading products:", error);
                setLoading(false);
            }
        };
        loadProducts();
    }, []);

    const addToCart = (producto, quantity = 1) => {
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
        // Actualizar stock de la sesion
        setProducts(prevProducts => 
            prevProducts.map(item =>
                item.id === producto.id
                    ? { ...item, stock: item.stock - quantity }
                    : item
            )
        );
    };

    const removeFromCart = (id, quantity) => {
        setCart(prevCart => prevCart.filter(item => item.id !== id));
        
        // Restaurar stock si se elimina del carrito
        setProducts(prevProducts => 
            prevProducts.map(item =>
                item.id === id
                    ? { ...item, stock: item.stock + quantity }
                    : item
            )
        );
    };

    const clearCart = () => {
        setCart([]);
      };    
    
    const updateQuantity = (id, oldQuantity, newQuantity) => {
        setCart(prevCart =>
            prevCart.map(item =>
                item.id === id ? { ...item, cantidad: newQuantity } : item
            )
        );
        // Ajustar stock al cambio de cantidad
        setProducts(prevProducts => 
            prevProducts.map(item =>
                item.id === id
                    ? { ...item, stock: item.stock + (oldQuantity - newQuantity) }
                    : item
            )
        );
    };
    
    return (
        <AppContext.Provider value={{ 
            cart, 
            products,
            loading,
            addToCart, 
            removeFromCart, 
            updateQuantity,
            clearCart,
        }}>
            {children}
        </AppContext.Provider>
    );
};

export function useAppContext() {
    return useContext(AppContext);
};