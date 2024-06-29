// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Landing from './Components/Landing';
import Carousel from './Components/Carousel';
import Products from './Components/Products';
import Header from './Pages/Header';
import Sidebar from './Components/Sidebar';
import Admin from './User/Admin';
import ProductForm from './Components/ProductForm';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from 'react-use-cart';
import Cart from './Components/Cart';
import { AuthProvider } from './Components/AuthContext';
import OrderHistory from './Components/OrderHistory';

import './App.css';
import PoductDetail from './Components/PoductDetail';

function App() {
  return (
    <div>
      <AuthProvider>
        <CartProvider>
          <Router>
            <Routes>
              <Route path='/' element={<Landing />} />
              <Route path='/login' element={<Login />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/register' element={<Register />} />
              <Route path='/header' element={<Header />} />
              <Route path='/carousel' element={<Carousel />} />
              <Route path='/products' element={<Products />} />
              <Route path='/admin' element={<Admin />} />
              <Route path='/sidebar' element={<Sidebar />} />
              <Route path='/prductform' element={<ProductForm />} />
              <Route path='/orderhistory' element={<OrderHistory />} />
              <Route path='/product/:id' element={<PoductDetail/>}/>
              {/* <Route path='/prductcard' element={<ProductCard />} /> */}
            </Routes>
            <Toaster position="top-center" />
          </Router>
        </CartProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
