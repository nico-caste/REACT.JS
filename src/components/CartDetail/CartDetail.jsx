import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/context';
import './CartDetail.scss';
import Swal from 'sweetalert2';
import { createOrder, updateProductStock } from '../../services/firebaseServices';
import { CheckoutForm } from '../CheckoutForm/CheckoutForm';

function CartDetail() {
    const { cart, products, removeFromCart, updateQuantity, clearCart, refreshProducts } = useAppContext();
    const [showForm, setShowForm] = useState(false);

    const { totalARS, totalUSD } = useMemo(() => {
        const totalARS = cart.reduce((sum, item) => sum + (item.precioARS * item.cantidad), 0);
        const totalUSD = cart.reduce((sum, item) => sum + (item.precioUSD * item.cantidad), 0);
        return { totalARS, totalUSD };
    }, [cart]);

    const handleQuantityChange = (item, newQuantity) => {
        if (newQuantity > 0) {
            updateQuantity(item.id, newQuantity);
        } else {
            removeFromCart(item.id);
        }
    };

    const handleProceedToCheckout = () => {
        const itemsExceedingStock = cart.filter(cartItem => {
            const productInDb = products.find(p => p.id === cartItem.id);
            return productInDb && cartItem.cantidad > productInDb.stock;
        });

        if (itemsExceedingStock.length > 0) {
            let errorMsg = "Los siguientes productos superan el stock disponible:<br/>";
            itemsExceedingStock.forEach(item => {
                const productInDb = products.find(p => p.id === item.id);
                errorMsg += `<br/>- <b>${item.nombre}</b> (Solicitados: ${item.cantidad}, disponibles: ${productInDb.stock})`;
            });
            
            Swal.fire({
                title: 'Stock insuficiente',
                html: errorMsg,
                icon: 'error',
                confirmButtonText: 'Entendido'
            });
            return;
        }

        setShowForm(true);
    };

    const handleCheckout = async (buyerData) => {
        try {
            const order = {
                cliente: buyerData,
                productos: cart.map(item => ({
                    id: item.id,
                    nombre: item.nombre,
                    cantidad: item.cantidad,
                    precioARS: item.precioARS
                })),
                totalARS,
                totalUSD,
                fecha: new Date().toISOString(),
                estado: 'pendiente'
            };

            await updateProductStock(cart);
            
            const orderId = await createOrder(order);

            clearCart();
            refreshProducts();
            
            Swal.fire({
                title: '¡Orden generada!',
                text: `Tu orden con ID ${orderId} ha sido creada correctamente`,
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });

        } catch (error) {
            console.error('Error al generar la orden:', error);
            Swal.fire({
                title: 'Error',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    };

    if (cart.length === 0) {
        return (
            <div className="empty-cart">
                <h1>Tu carrito está vacío</h1>
                <Link to="/" className="btn btn-secondary">
                    Continuar comprando
                </Link>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <h1>Tu Carrito</h1>
            <div className="cart-items">
                {cart.map(item => (
                    <div key={item.id} className="cart-item">
                        <img src={item.image} alt={item.nombre} />
                        <div className="item-details">
                            <div>
                                <h3>{item.nombre}</h3>
                                <p><strong>Stock disponible: {item.stock}</strong></p>
                                <p>Precio unitario: ${item.precioARS.toFixed(2)} ( U${item.precioUSD} )</p>
                            </div>
                            <div className="item-count">
                                <div>
                                    <button className="btn btn-secondary"
                                        onClick={() => handleQuantityChange(item, item.cantidad - 1)}
                                        disabled={item.cantidad <= 1}>
                                        -
                                    </button>
                                    <span>{item.cantidad}</span>
                                    <button className="btn btn-secondary"
                                        onClick={() => handleQuantityChange(item, item.cantidad + 1)}
                                        disabled={item.cantidad >= item.stock}>
                                        +
                                    </button>
                                </div>
                                <p>Subtotal: ${(item.precioARS * item.cantidad).toFixed(2)} ( U${(item.precioUSD * item.cantidad).toFixed(2)} )</p>
                            </div>
                        </div>
                        <button className="btn btn-secondary"
                            onClick={() => removeFromCart(item.id)}
                            aria-label={`Eliminar ${item.nombre} del carrito`}>
                            <p><strong>Remover item</strong></p>
                        </button>
                    </div>
                ))}
            </div>
            <div className="cart-summary">
                <h2>Resumen</h2>
                <p>Total: ${totalARS.toFixed(2)} ( U${totalUSD.toFixed(2)} )</p>
                <button className="btn btn-secondary" onClick={handleProceedToCheckout}>
                    Proceder al Pago
                </button>
            </div>

            {showForm && <CheckoutForm onConfirm={handleCheckout} />}
        </div>
    );
};

export default CartDetail;