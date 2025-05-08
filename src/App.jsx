import { BrowserRouter, Route, Routes } from 'react-router';
import { AppProvider } from './context/context';
import ItemListContainer from './components/ItemListcontainer/ItemListContainer';
import Navbar from './components/Navbar/Navbar';
import ItemDetail from './components/ItemDetail/ItemDetail';
import CartDetail from './components/CartDetail/CartDetail';
import OrdersDetail from './components/OrdersDetail.jsx/OrdersDetail';
import './App.css';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<ItemListContainer />}/>
          <Route path="/categoria/:categoria" element={<ItemListContainer />}/>
          <Route path="/detalle/:id" element={<ItemDetail />}/>
          <Route path="/cart" element={<CartDetail />} />
          <Route path="/ordenes" element={<OrdersDetail />} />
          <Route path="*" element={<p>Error al buscar la direccion</p>}/>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;