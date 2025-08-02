import React, { useState } from 'react';

  
// Backend URL for Vercel deployment
// When REACT_APP_BACKEND_URL is not set, we use an empty string to make URLs relative to the current domain
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';

const ProductList = ({ products, addToCart }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleImageClick = (product) => {
    setSelectedProduct(product);
  };

  const closeDialog = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="product-list" style={{
      display: 'grid',
      gridTemplateColumns: 'auto auto',
      gap: '10px',
      padding: '10px',
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto',
    }}>
      {products.map(product => (
        <div key={product.id} className="product-card" style={{
          border: '1px solid #ddd',
          borderRadius: '8px',
          padding: '16px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}>
          <img
            src={`${BACKEND_URL}${product.image}`}
            alt={product.name}
            onClick={() => handleImageClick(product)}
            style={{ width: 'auto', height: '300px', objectFit: 'contain', marginBottom: '12px', marginLeft: 'auto', marginRight: 'auto' }}
          />
          <h3>{product.name}</h3>
          <button onClick={() => {
            addToCart(product);
            window.location.href = "https://vt.tiktok.com/ZSShMRRrr/";
          }} style={{
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            padding: '10px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}>Add to Cart</button>
        </div>
      ))}

      {selectedProduct && (
        <div className="dialog-overlay" onClick={closeDialog} style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
        }}>
          <div className="dialog-content" onClick={e => e.stopPropagation()} style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            maxWidth: '80%',
            maxHeight: '80%',
            overflowY: 'auto',
            animation: 'zoomIn 0.3s ease forwards',
          }}>
            <h2>{selectedProduct.name} - Images</h2>
            <div className="image-gallery" style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
              {selectedProduct.images && selectedProduct.images.map((imgSrc, index) => (
                <img
                  key={index}
                  src={`${BACKEND_URL}${imgSrc}`}
                  alt={`${selectedProduct.name} ${index + 1}`}
                  style={{ maxWidth: '150px', maxHeight: '150px', objectFit: 'contain', cursor: 'pointer' }}
                />
              ))}
            </div>
            <button onClick={closeDialog} style={{ marginTop: '20px' }}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

const style = document.createElement('style');
style.innerHTML = `
@keyframes zoomIn {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
`;
document.head.appendChild(style);

export default ProductList;
