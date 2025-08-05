const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Load environment variables

connectToMongo(); // Connect to DB
const app = express();
const port = process.env.PORT || 5000;

// Iske baad aap 'app' aur 'port' ka use kar sakte hain
const allowedOrigins = ["http://localhost:3000", "https://notenest-frontend-git-main-ahsan0017s-projects.vercel.app"];

// Purana 'cors' code hatao aur yeh naya, simple code add karo
app.use(cors({ origin: allowedOrigins }));

app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// Start Server
app.listen(port, () => {
  console.log(`🚀 iNotebook backend listening at http://localhost:${port}`);
});