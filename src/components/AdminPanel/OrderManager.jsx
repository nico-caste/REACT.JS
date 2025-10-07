import { useState, useEffect } from "react";
import { getOrders, updateOrderStatus, deleteOrder, sendOrderStatusEmail } from "../../services/firebaseServices";
import Loader from "../Loader/Loader";
import Swal from 'sweetalert2';
import './OrderManager.scss';
import { IoTrashBinOutline } from "react-icons/io5";


const OrderManager = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const statuses = ["pendiente de pago", "en preparacion", "enviando", "entregado", "cancelado"];

    const fetchOrders = async () => {
        setLoading(true);
        const ordenes = await getOrders();
        setOrders(ordenes);
        setLoading(false);
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await updateOrderStatus(orderId, newStatus);
            const updatedOrder = orders.find(o => o.id === orderId);
            if (updatedOrder) {
                const productListString = updatedOrder.productos
                    .map(p => `- ${p.nombre} (x${p.cantidad})`)
                    .join('\n');
                const templateParams = {
                    customer_name: updatedOrder.cliente.nombre,
                    customer_email: updatedOrder.cliente.email,
                    order_id: orderId,
                    order_status: newStatus,
                    order_total: updatedOrder.totalARS.toFixed(2),
                    product_list: productListString
                };
                await sendOrderStatusEmail(templateParams);
            }
            
            setOrders(prevOrders => 
                prevOrders.map(order => 
                    order.id === orderId ? { ...order, estado: newStatus } : order
                )
            );
            Swal.fire('Actualizado', 'El estado de la orden ha sido actualizado y se ha notificado al cliente.', 'success');
        } catch (error) {
            Swal.fire('Error', `No se pudo actualizar el estado o enviar el correo, ${error.message}`, 'error');
        }
    };

    const handleDeleteOrder = (orderId) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: `Esta acción no se puede revertir. Se eliminará la orden con ID: ${orderId}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, ¡eliminar!',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteOrder(orderId);
                    setOrders(prevOrders => prevOrders.filter(o => o.id !== orderId));
                    Swal.fire(
                        '¡Eliminada!',
                        'La orden ha sido eliminada.',
                        'success'
                    );
                } catch (error) {
                    Swal.fire(
                        'Error',
                        'No se pudo eliminar la orden. Inténtalo de nuevo más tarde. (' + error.message + ')',
                        'error'
                    );
                }
            }
        });
    };

    if (loading) return <Loader />;

    return (
        <div>
            <h2>Gestionar Órdenes</h2>
            <div className="orders-list">
                {orders.map(order => (
                    <div key={order.id} className="order-card">
                        <div className="order-card-header">
                            <h4>Orden ID: {order.id}</h4>
                            {/* 3. AÑADIMOS EL BOTÓN DE ELIMINAR */}
                            <button onClick={() => handleDeleteOrder(order.id)} className="delete-btn">
                                <IoTrashBinOutline size={20} />
                            </button>
                        </div>
                        <p><strong>Cliente:</strong> {order.cliente.nombre}</p>
                        <p><strong>Fecha:</strong> {new Date(order.fecha).toLocaleString()}</p>
                        <p><strong>Total:</strong> ${order.totalARS.toFixed(2)}</p>
                        <div className="order-status-selector">
                            <label>Estado: </label>
                            <select value={order.estado} onChange={(e) => handleStatusChange(order.id, e.target.value)}>
                                {statuses.map(status => (
                                    <option key={status} value={status}>{status}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderManager;