import React, { useState } from 'react';

// Backend URL for Vercel deployment
// When REACT_APP_BACKEND_URL is not set, we use an empty string to make URLs relative to the current domain
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';

const ProductInput = ({ refreshProducts }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !price) {
      setMessage('Name and price are required.');
      return;
    }

    let imagePath = '';
    if (imageFile) {
      const formData = new FormData();
      formData.append('image', imageFile);

      try {
        const uploadResponse = await fetch(`${BACKEND_URL}/api/upload-image`, {
          method: 'POST',
          body: formData,
        });
        const uploadData = await uploadResponse.json();
        if (uploadResponse.ok) {
          imagePath = uploadData.imagePath;
        } else {
          setMessage(`Image upload failed: ${uploadData.message}`);
          return;
        }
      } catch (error) {
        setMessage(`Error uploading image: ${error.message}`);
        return;
      }
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, price, image: imagePath, category }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(`Product added successfully: ${data.product.name}`);
        setName('');
        setPrice('');
        setImageFile(null);
        setCategory('');
        document.getElementById('imageInput').value = '';
        if (refreshProducts) {
          refreshProducts();
        }
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
          Product Image:
          <input
            type="file"
            id="imageInput"
            accept="image/*"
            onChange={handleFileChange}
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
