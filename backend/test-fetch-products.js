const axios = require('axios');

async function fetchProducts() {
  try {
    const response = await axios.get('http://localhost:5000/api/products');
    console.log('Product data:', response.data);
  } catch (error) {
    console.error('Error fetching product data:', error.message);
  }
}

fetchProducts();
