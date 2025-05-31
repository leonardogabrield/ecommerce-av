import { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import { CartContext } from './context/CartContext'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home'
import Contacto from './pages/Contacto'
import ListadoDeProductos from './pages/ListadoDeProductos'
import Admin from './pages/Admin'
import Login from './pages/Login'
import RutasProtegidas from './authorize/RutasProtegidas'
import Page404 from './pages/Page404';
import DetalleDeProducto from './pages/DetalleDeProducto';

function App() {
  
  const { isAuthenticated } = useContext(CartContext)

  return (

    <Routes>

      <Route path='/' element={<Home />} />

      <Route path='/productos' element={<ListadoDeProductos />} />

      <Route path='/producto/:id' element={<DetalleDeProducto />} />

      <Route path='/contacto' element={<Contacto />} />

      <Route path='/admin' element={<RutasProtegidas isAuthenticated={isAuthenticated}> <Admin /> </RutasProtegidas>} />

      <Route path='/login' element={<Login />} />

      <Route path='*' element={<Page404 />} />

    </Routes>
  )
}

export default App
