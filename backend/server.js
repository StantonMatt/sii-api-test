const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000; // Use a different port from your Webpack DevServer

app.use(cors()); // Enable CORS if your front-end needs to access this server
app.use(express.json()); // Middleware to parse JSON bodies

// Define a simple route for GET requests
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the back-end!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
