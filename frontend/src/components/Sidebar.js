import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Menu</h2>
      <ul className="sidebar-menu">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Men's Clothing</Link></li>
        <li><Link to="/cart">Cart</Link></li>
        <li><a href="#about">About</a></li>
      </ul>
    </div>
  );
};

export default Sidebar;
