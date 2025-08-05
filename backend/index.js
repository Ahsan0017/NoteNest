const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Load environment variables

connectToMongo(); // Connect to DB
const app = express();
const port = process.env.PORT || 5000; // Use Render port or 5000 locally

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// Start Server
app.listen(port, () => {
  console.log(`🚀 iNotebook backend listening at http://localhost:${port}`);
});

