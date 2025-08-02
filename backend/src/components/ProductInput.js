import React, { useState } from 'react';

const ProductInput = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !price) {
      setMessage('Name and price are required.');
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, price, image, category }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(`Product added successfully: ${data.product.name}`);
        setName('');
        setPrice('');
        setImage('');
        setCategory('');
      } else {
        setMessage(`Failed to add product: ${data.message}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="product-input-container">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Product Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Price:
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Image File Name:
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Optional"
          />
        </label>
        <br />
        <label>
          Category:
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Optional"
          />
        </label>
        <br />
        <button type="submit">Add Product</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ProductInput;
