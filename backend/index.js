const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Load environment variables

connectToMongo(); // Connect to DB
const app = express(); // 'app' defined here
const port = process.env.PORT || 5000; // <-- Yeh line missing hai

// Iske baad aap 'app' aur 'port' ka use kar sakte hain
const allowedOrigins = ["http://localhost:3000", "https://notenest-frontend.vercel.app"];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// Start Server
app.listen(port, () => {
  console.log(`🚀 iNotebook backend listening at http://localhost:${port}`);
});