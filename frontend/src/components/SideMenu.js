import React from 'react';

const SideMenu = ({ selectedCategory, onCategorySelect }) => {
  const categories = ['Shoes', 'Clothes', 'Pants', 'Accesories'];

  return (
    <div style={{
      width: '200px',
      backgroundColor: '#f8f9fa',
      borderRight: '1px solid #ddd',
      padding: '20px',
      boxSizing: 'border-box',
      overflowY: 'auto',
      height: '100vh',
    }}>
      <h3 style={{ marginTop: 0 }}>Category</h3>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {categories.map(category => (
          <li
            key={category}
            style={{
              marginBottom: '10px',
              cursor: 'pointer',
              fontWeight: selectedCategory === category ? 'bold' : 'normal',
              color: selectedCategory === category ? '#007bff' : 'inherit',
            }}
            onClick={() => onCategorySelect(category)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideMenu;
