const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env file

connectToMongo(); // Connect to MongoDB Atlas
const app = express();
const port = process.env.PORT || 5000; // Define port to avoid 'port is not defined' error

// Permanent Vercel URL
const allowedOrigins = [
  "http://localhost:3000",
  "https://notenest-frontend.vercel.app"
];

// Fixed CORS configuration to prevent server crash.
// This will simply block unauthorized requests without throwing an error.
app.use(cors({ origin: allowedOrigins }));

app.use(express.json());

// Available Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// Start Server
app.listen(port, () => {
  console.log(`🚀 iNotebook backend listening at http://localhost:${port}`);
});