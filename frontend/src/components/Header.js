import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ isLoggedIn, username, onLogout }) => {
  return (
    <header className="header">
      <nav className="header-nav">
        <ul className="header-menu">
          <li>{isLoggedIn ? <Link to="/">Home</Link> : <span className="disabled-link">Home</span>}</li>
          <li>{isLoggedIn ? <Link to="/products">Men's Clothing</Link> : <span className="disabled-link">Men's Clothing</span>}</li>
          <li>{isLoggedIn ? <Link to="/cart">Cart</Link> : <span className="disabled-link">Cart</span>}</li>
          <li>{isLoggedIn ? <Link to="/upload-image">Upload Image</Link> : <span className="disabled-link">Upload Image</span>}</li>
          <li>{isLoggedIn ? <Link to="/product-input">Add Product</Link> : <span className="disabled-link">Add Product</span>}</li>
          <li>{isLoggedIn ? <a href="#about">About</a> : <span className="disabled-link">About</span>}</li>
        </ul>
        <ul className="header-auth-menu">
          {isLoggedIn ? (
            <>
              <li className="username-display">Welcome, {username}</li>
              <li><button className="logout-button" onClick={onLogout}>Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Signup</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
