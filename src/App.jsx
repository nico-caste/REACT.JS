import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css';
import ItemListContainer from './components/ItemListcontainer/ItemListContainer';
import Navbar from './components/Navbar/Navbar';
import ItemDetail from './components/ItemDetail/ItemDetail';

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<ItemListContainer />}/>
        <Route path="/categoria/:categoria" element={<ItemListContainer />}/>
        <Route path="/detalle/:id" element={<ItemDetail />}/>
        <Route path="*" element={<p>Error al buscar la direccion</p>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App
