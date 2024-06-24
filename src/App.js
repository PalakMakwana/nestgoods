import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Landing from './Components/Landing';
import Carousel from './Components/Carousel';
import Products from './Components/Products'
import Header from './Pages/Header'
import Cart from './Components/Cart';
import Sidebar from './Components/Sidebar';
import './App.css';
import Admin from './User/Admin';
import ProductForm from './Components/ProductForm';
import ProductCard from './Components/ProductCard';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/header' element={<Header/>} />
          <Route path='/carousel' element={<Carousel/>} />
          <Route path='/products' element={<Products/>} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/admin' element={<Admin/>} />
          <Route path='/sidebar' element={<Sidebar/>} />
          <Route path='/prductform' element={<ProductForm/>} />
          <Route path='/prductcard' element={<ProductCard/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
