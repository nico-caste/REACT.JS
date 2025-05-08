import { Link } from 'react-router';
import { useAppContext } from '../../context/context';
import './CartDetail.css';
import Swal from 'sweetalert2';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

function CartDetail() {
    const { cart, removeFromCart, updateQuantity, clearCart } = useAppContext();
    const totalARS = cart.reduce((sum, item) => sum + (item.precioARS * item.cantidad), 0);
    const totalUSD = cart.reduce((sum, item) => sum + (item.precioUSD * item.cantidad), 0);

    const handleQuantityChange = (id, oldQuantity, newQuantity) => {
        if (newQuantity > 0) {
            updateQuantity(id, oldQuantity, newQuantity);
        } else {
            removeFromCart(id, oldQuantity);
        }
    };

    const handleCheckout = async () => {
        const { value: formValues } = await Swal.fire({
            title: 'Completá tus datos',
            html:
              '<input id="swal-input1" class="swal2-input" placeholder="Nombre Completo" required>' +
              '<input id="swal-input2" class="swal2-input" placeholder="Email" required>' +
              '<input id="swal-input3" class="swal2-input" placeholder="Teléfono" required>',
            focusConfirm: false,
            preConfirm: () => {
              // Validacion
              const nombre = document.getElementById('swal-input1').value;
              const email = document.getElementById('swal-input2').value;
              const telefono = document.getElementById('swal-input3').value;
              if (!nombre || !email || !telefono) {
                Swal.showValidationMessage('Todos los campos son obligatorios');
                return false;
              }
              if (!/^\S+@\S+\.\S+$/.test(email)) {
                Swal.showValidationMessage('Ingrese un email válido');
                return false;
              }
              return {
                nombre,
                email,
                telefono
              };
            },
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Confirmar',
            allowOutsideClick: false
          });
        if (formValues) {
            try {
                // Crear objeto
                const order = {
                    cliente: {
                        nombre: formValues.nombre,
                        email: formValues.email,
                        telefono: formValues.telefono
                    },
                    productos: cart.map(item => ({
                        id: item.id,
                        nombre: item.nombre,
                        cantidad: item.cantidad,
                        precioARS: item.precioARS,
                        precioUSD: item.precioUSD
                    })),
                    totalARS,
                    totalUSD,
                    fecha: new Date().toISOString(),
                    estado: 'pendiente'
                };
                // Guardar en Firebase
                const ordenesCollection = collection(db, 'ordenes');
                const docRef = await addDoc(ordenesCollection, order);
                // Vonfirmacion
                Swal.fire({
                    title: '¡Orden generada!',
                    text: `Tu orden con ID ${docRef.id} ha sido creada correctamente`,
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                });
                // Limpiar carrito despues de generar la orden
                clearCart();
            } catch (error) {
                console.error('Error al generar la orden:', error);
                Swal.fire({
                    title: 'Error',
                    text: 'Hubo un problema al generar tu orden. Por favor intentá nuevamente.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            }
        }
    };

    return (
        <div className="cart-page">
            <h1>Tu Carrito</h1>
            {cart.length === 0 ? (
                <div className="empty-cart">
                    <p>Tu carrito está vacío</p>
                    <Link to="/" className="continue-shopping">
                        Continuar comprando
                    </Link>
                </div>
            ) : (
                <>
                    <div className="cart-items">
                        {cart.map(item => (
                            <div key={item.id} className="cart-item">
                                <img src={item.image} alt={item.nombre} />
                                <div className="item-details">
                                    <h3>{item.nombre}</h3>
                                    <p>Precio unitario: ${item.precioARS.toFixed(2)} / U${item.precioUSD}</p>
                                    <div className="quantity-control">
                                        <button 
                                            onClick={() => handleQuantityChange(item.id, item.cantidad, item.cantidad - 1)}
                                            disabled={item.cantidad <= 1}
                                        >
                                            -
                                        </button>
                                        <span>{item.cantidad}</span>
                                        <button 
                                            onClick={() => handleQuantityChange(item.id, item.cantidad, item.cantidad + 1)}
                                            disabled={item.cantidad >= item.stock}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <p>Subtotal: ${(item.precioARS * item.cantidad).toFixed(2)} / U${(item.precioUSD * item.cantidad).toFixed(2)}</p>
                                </div>
                                <button 
                                    onClick={() => removeFromCart(item.id, item.cantidad)}
                                    className="remove-item"
                                    aria-label={`Eliminar ${item.nombre} del carrito`}
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="cart-summary">
                        <h2>Resumen</h2>
                        <p>Total: ${totalARS.toFixed(2)} / U${totalUSD.toFixed(2)}</p>
                        <button 
                            className="checkout-button"
                            onClick={handleCheckout}
                        >
                            Generar orden de pedido
                        </button>
                        <Link to="/" className="continue-shopping">
                            Seguir comprando
                        </Link>
                    </div>
                </>
            )}
        </div>
    )
};

export default CartDetail;