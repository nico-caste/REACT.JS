import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import "./OrdersDetail.css";
import Loader from "../Loader/Loader";

// Función para obtener ordenes
export const fetchOrders = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "ordenes"));
    const ordenes = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return ordenes;
  } catch (err) {
    console.error("Error al cargar ordenes: ", err);
    throw err;
  }
};

const OrdersDetail = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const ordenes = await fetchOrders();
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
            <th>Estado de preparacion</th>
            <th>Fecha</th>
            <th>Productos</th>
            <th>Total ARS</th>
            <th>Total USD</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.cliente.nombre || "N/A"}</td>
              <td>{order.estado || "N/A"}</td>
              <td>{order.fecha || "N/A"}</td>
              <td>
                {order.productos ? (
                  <ul>
                    {order.productos.map((producto, index) => (
                      <li key={index}>
                        {producto.nombre} x {producto.cantidad}
                      </li>
                    ))}
                  </ul>
                ) : (
                  "N/A"
                )}
              </td>
              <td>{order.totalARS ? `$${order.totalARS}` : "N/A"}</td>
              <td>{order.totalUSD ? `$${order.totalUSD}` : "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersDetail;