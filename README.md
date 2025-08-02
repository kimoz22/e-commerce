# E-Commerce Shop

This is a full-stack e-commerce application with a React frontend and Node.js/Express backend.

## Project Structure

```
ecommerce-shop/
├── frontend/          # React frontend application
├── backend/           # Node.js/Express backend API
└── vercel.json        # Vercel deployment configuration
```

## Deployment to Vercel

### Prerequisites

1. Create a [Vercel account](https://vercel.com/signup)
2. Install [Vercel CLI](https://vercel.com/cli) (optional but recommended)

### Deployment Steps

1. **Create a new project on Vercel:**
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Select the root directory of your project

2. **Configure Environment Variables:**
   - In your Vercel project settings, go to "Environment Variables"
   - Add `REACT_APP_BACKEND_URL` with the value of your Vercel deployment URL
   - For example: `https://your-project-name.vercel.app`

3. **Update Configuration:**
   - The `vercel.json` file in the root directory configures the deployment
   - The frontend will be built using Create React App
   - The backend will be served as a Node.js function

4. **Deploy:**
   - Push your changes to GitHub
   - Vercel will automatically deploy your application

### Environment Variables

Create a `.env` file in the `frontend/` directory with the following:

```
REACT_APP_BACKEND_URL=https://your-app-name.vercel.app
```

### Local Development

To run the application locally:

1. **Start the backend:**
   ```bash
   cd backend
   npm install
   npm start
   ```

2. **Start the frontend:**
   ```bash
   cd frontend
   npm install
   npm start
   ```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

### Troubleshooting

If images are not loading:
1. Check that the `REACT_APP_BACKEND_URL` environment variable is set correctly
2. Verify that the image paths in `backend/products.json` are correct
3. Ensure the backend is properly serving images from the `/images` route

If API calls are failing:
1. Check that the backend URL is correctly configured in the frontend
2. Verify that the backend is running and accessible
3. Check the browser's developer console for network errors
