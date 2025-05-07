import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css';
import ItemListContainer from './components/ItemListcontainer/ItemListContainer';
import Navbar from './components/Navbar/Navbar';
import ItemDetail from './components/ItemDetail/ItemDetail';
import CartDetail from './components/CartDetail/CartDetail';
import { AppProvider } from './context/context';

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
          <Route path="*" element={<p>Error al buscar la direccion</p>}/>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App
