import React, { useState } from 'react';

// Backend URL for Vercel deployment
// When REACT_APP_BACKEND_URL is not set, we use an empty string to make URLs relative to the current domain
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';

const ImageUpload = () => {
  const [imageFile, setImageFile] = useState(null);
  const [productId, setProductId] = useState('');
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleProductIdChange = (e) => {
    setProductId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      setMessage('Please select an image file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('image', imageFile);
    if (productId) {
      formData.append('productId', productId);
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/upload-image`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(`Image uploaded successfully: ${data.imagePath}`);
      } else {
        setMessage(`Upload failed: ${data.message}`);
      }
    } catch (error) {
      setMessage(`Error uploading image: ${error.message}`);
    }
  };

  return (
    <div className="image-upload-container">
      <h2>Upload Product Image</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Select Image:
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </label>
        <br />
        <label>
          Product ID (optional):
          <input type="number" value={productId} onChange={handleProductIdChange} />
        </label>
        <br />
        <button type="submit">Upload Image</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ImageUpload;
