import { useState, useEffect } from "react";
import { getOrders } from "../../services/firebaseServices";
import "./OrdersDetail.scss";
import Loader from "../Loader/Loader";

const OrdersDetail = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const ordenes = await getOrders();
        setOrders(ordenes);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  if (loading) return <div><Loader /></div>;
  if (error) return <div>Error: {error}</div>;
  if (orders.length === 0) return <div>No hay órdenes disponibles</div>;

  return (
    <div className="orders-container">
      <h1>Lista de ordenes en base de datos</h1>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Estado del pedido</th>
            <th>Fecha</th>
            <th>Productos</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td data-label="Nombre">{order.cliente.nombre || "N/A"}</td>
              <td data-label="Estado">{order.estado || "N/A"}</td>
              <td data-label="Fecha">{order.fecha || "N/A"}</td>
              <td data-label="Productos">
                {order.productos ? (
                  <ul>
                    {order.productos.map((producto, index) => (
                      <li key={index}>
                        {producto.nombre} = ${producto.precioARS} ( U${producto.precioUSD} ) x {producto.cantidad}
                      </li>
                    ))}
                  </ul>
                ) : (
                  "N/A"
                )}
              </td>
              <td data-label="Total">{order.totalARS ? `$${order.totalARS}` : "N/A"} ( {order.totalUSD ? `U$${order.totalUSD}` : "N/A"} )</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersDetail;