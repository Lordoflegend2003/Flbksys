  const express = require('express');
  const app = express();
  const { Pool } = require('pg');
  const cors = require('cors');

  const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'flights_database',
    password: 'pawan@2003',
    port: 5432,
  });

  app.use(cors({
    origin: 'http://localhost:3000',
  }));  


  app.get('/api/flights', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM "flights"');
      const flights = result.rows;
      client.release();
      res.json(flights);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  app.listen(3001, () => {
    console.log('Server is running on port 3001');
  });
