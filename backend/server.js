const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const multer = require('multer');

const app = express();
const PORT = 5000;

const corsOptions = {
  origin: '*', // allow all origins for development
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

const usersFile = path.join(__dirname, 'users.json');
const productsFile = path.join(__dirname, 'products.json');

//To Setup Meddleware CORS 



// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'public/images'));
  },
  filename: function (req, file, cb) {
    // Save with original filename only, no random suffix
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

// Helper function to read users from file
function readUsers() {
  try {
    const data = fs.readFileSync(usersFile, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

// Helper function to write users to file
function writeUsers(users) {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

// Helper function to read products from file
function readProducts() {
  try {
    const data = fs.readFileSync(productsFile, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

// Helper function to write products to file
function writeProducts(products) {
  fs.writeFileSync(productsFile, JSON.stringify(products, null, 2));
}

const commonBreachedPasswords = [
  '123456',
  'password',
  '123456789',
  '12345678',
  '12345',
  '111111',
  '1234567',
  'sunshine',
  'qwerty',
  'iloveyou',
  'princess',
  'admin',
  'welcome',
  '666666',
  'abc123'
];

function isPasswordStrong(password) {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  return password.length >= minLength && hasUpperCase && hasLowerCase && hasDigit && hasSpecialChar;
}

app.post('/api/register', async (req, res) => {
  const { firstName, lastName, address, contactNo, userName, password } = req.body;

  if (!firstName || !lastName || !address || !contactNo || !userName || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (commonBreachedPasswords.includes(password)) {
    return res.status(400).json({ message: 'Password is too common and has been found in data breaches. Please choose a stronger password.' });
  }

  if (!isPasswordStrong(password)) {
    return res.status(400).json({ message: 'Password must be at least 8 characters long and include uppercase, lowercase, digit, and special character.' });
  }

  const users = readUsers();

  const existingUser = users.find(u => u.userName === userName);
  if (existingUser) {
    return res.status(409).json({ message: 'Username already exists' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { firstName, lastName, address, contactNo, userName, password: hashedPassword };
    users.push(newUser);
    writeUsers(users);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error registering user' });
  }
});

app.post('/api/login', async (req, res) => {
  const { userName, password } = req.body;

  if (!userName || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const users = readUsers();

  const user = users.find(u => u.userName === userName);
  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  try {
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    res.status(200).json({ message: 'Login successful', user: { userName: user.userName, firstName: user.firstName } });
  } catch (err) {
    res.status(500).json({ message: 'Error during login' });
  }
});

// Image upload endpoint
app.post('/api/upload-image', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No image file uploaded' });
  }

  const imagePath = '/images/' + req.file.filename;

  // Optionally, update products.json with new image path if product ID is provided
  const { productId } = req.body;
  if (productId) {
    const products = readProducts();
    const product = products.find(p => p.id === parseInt(productId));
    if (product) {
      product.image = imagePath;
      writeProducts(products);
    }
  }

  res.status(200).json({ message: 'Image uploaded successfully', imagePath });
});

app.get('/api/products', (req, res) => {
  try {
    const data = fs.readFileSync(productsFile, 'utf8');
    const products = JSON.parse(data);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load product data' });
  }
});

app.post('/api/products', (req, res) => {
  const { name, price, image } = req.body;
  if (!name || !price) {
    return res.status(400).json({ message: 'Name and price are required' });
  }
  try {
    const products = JSON.parse(fs.readFileSync(productsFile, 'utf8'));
    const newId = products.length > 0 ? products[products.length - 1].id + 1 : 1;
    const priceNumber = Number(price);
    if (isNaN(priceNumber)) {
      return res.status(400).json({ message: 'Price must be a valid number' });
    }
    const newProduct = { id: newId, name, price: priceNumber, image: image || '' };
    products.push(newProduct);
    fs.writeFileSync(productsFile, JSON.stringify(products, null, 2));
    res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add product' });
  }
});

// Export the app for Vercel serverless deployment
module.exports = app;

// Only start the server if this file is executed directly (for local development)
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Backend server running on http://0.0.0.0:${PORT}`);
  });
}
