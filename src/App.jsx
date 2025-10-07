import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppProvider } from './context/context';
import ItemListContainer from './components/ItemListcontainer/ItemListContainer';
import Navbar from './components/Navbar/Navbar';
import ItemDetail from './components/ItemDetail/ItemDetail';
import CartDetail from './components/CartDetail/CartDetail';
import OrdersDetail from './components/OrdersDetail/OrdersDetail';
import AdminPanel from './components/AdminPanel/AdminPanel';
import ProductManager from './components/AdminPanel/ProductManager';
import OrderManager from './components/AdminPanel/OrderManager';
import './App.css';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Navbar />
          <main className="main-container">
            <Routes>
              <Route path="/" element={<ItemListContainer />}/>
              <Route path="/categoria/:categoria" element={<ItemListContainer />}/>
              <Route path="/detalle/:id" element={<ItemDetail />}/>
              <Route path="/cart" element={<CartDetail />} />
              <Route path="/ordenes" element={<OrdersDetail />} />
              <Route path="*" element={<p>Error al buscar la direccion</p>}/>

              <Route path="/admin" element={<AdminPanel />}>
                <Route index element={<h2>Bienvenido al Panel de Administración</h2>} />
                <Route path="products" element={<ProductManager />} />
                <Route path="orders" element={<OrderManager />} />
              </Route>
            </Routes>
          </main>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;