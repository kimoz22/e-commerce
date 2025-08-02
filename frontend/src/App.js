import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import ImageUpload from './components/ImageUpload';
import ProductInput from './components/ProductInput';
import './App.css';

function App() {  
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Shoes');

  const fetchProducts = () => {
    // Use the backend URL for API calls
    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
    fetch(`${backendUrl}/api/products`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => setProducts(data))
      .catch(err => {
        console.error('Error fetching products:', err);
        alert('Failed to fetch product data. Please check backend server and network.');
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems =>
      prevItems.filter(item => item.id !== productId)
    );
  };

  const PrivateRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/login" replace />;
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const filteredProducts = products.filter(product => product.category === selectedCategory);

  return (
    <Router>
      <div className="App">
        <h1>Faith Fuel</h1>
        <Header isLoggedIn={isLoggedIn} username={username} onLogout={() => {
          setIsLoggedIn(false);
          setUsername('');
        }} />
        <div className="content">
          <Routes>
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            } />
            <Route path="/products" element={
              <PrivateRoute>
                <ProductList products={filteredProducts} addToCart={addToCart} selectedCategory={selectedCategory} onCategorySelect={handleCategorySelect} />
              </PrivateRoute>
            } />
            <Route path="/cart" element={
              <PrivateRoute>
                <Cart cartItems={cartItems} removeFromCart={removeFromCart} />
              </PrivateRoute>
            } />
            <Route path="/upload-image" element={
              <PrivateRoute>
                <ImageUpload refreshProducts={fetchProducts} />
              </PrivateRoute>
            } />
            <Route path="/product-input" element={
              <PrivateRoute>
                <ProductInput refreshProducts={fetchProducts} />
              </PrivateRoute>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
