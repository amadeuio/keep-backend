const express = require('express');
const pool = require('./db');

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Test route with database connection
app.get('/', async (req, res) => {
  try {
    // Test query to verify database connection
    const result = await pool.query('SELECT NOW()');
    res.json({ 
      message: 'Hello World!',
      databaseTime: result.rows[0].now 
    });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

