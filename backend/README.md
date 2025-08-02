# E-commerce Shop - Backend

This is the backend for the E-commerce Clothing Shop application. It's built with Node.js and Express, and is designed to be deployed on Vercel.

## Deployment to Vercel

Follow these steps to deploy the application to Vercel:

### Prerequisites

1. Make sure you have a Vercel account (https://vercel.com)
2. Install Vercel CLI: `npm install -g vercel` (optional, can also deploy via GitHub integration)

### Deployment Steps

1. **Prepare the Application**:
   - Ensure the frontend has been built (`npm run build` in the frontend directory)
   - Copy the built frontend files to the backend's public directory:
     ```
     cp -r frontend/build/* backend/public/
     ```

2. **Deploy to Vercel**:
   - Navigate to the backend directory:
     ```
     cd backend
     ```
   - Deploy using Vercel CLI:
     ```
     vercel
     ```
   - Or deploy via GitHub integration:
     - Push your code to a GitHub repository
     - Connect the repository to Vercel
     - Set the root directory to `backend` in the Vercel project settings

### Configuration

The application uses the following configuration files:

- `vercel.json`: Defines the build and routing configuration for Vercel
- `server.js`: The main Express application file

### API Endpoints

- `GET /api/products`: Retrieve all products
- `POST /api/products`: Add a new product
- `POST /api/register`: Register a new user
- `POST /api/login`: Login with existing user credentials
- `POST /api/upload-image`: Upload product images

### File Structure

```
backend/
├── server.js          # Main Express application
├── vercel.json        # Vercel configuration
├── products.json      # Product data storage
├── users.json         # User data storage
├── public/            # Static files (frontend build and images)
│   ├── index.html     # Main frontend HTML file
│   ├── static/        # Frontend CSS and JS bundles
│   └── images/        # Product images
└── ...
```

### Environment Variables

The application does not require any environment variables for basic functionality, but you may want to set:

- `PORT`: Port to run the server on (default: 5000)

### Local Development

To run the application locally:

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the server:
   ```
   npm start
   ```

The server will start on `http://localhost:5000`.
