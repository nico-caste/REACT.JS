import { NavLink, Outlet } from 'react-router-dom';
import './AdminPanel.scss';

const AdminPanel = () => {
  return (
    <div className="admin-panel">
      <h1>Panel de Administración</h1>
      <nav className="admin-nav">
        <NavLink to="/admin/products">Gestionar Productos</NavLink>
        <NavLink to="/admin/orders">Gestionar Órdenes</NavLink>
      </nav>
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
};
export default AdminPanel;