const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();
const Port = process.env.PORT || 3001;


const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});


app.use(bodyParser.json());
app.use(cors({
  origin: process.env.FRONTEND_ORIGIN,
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



app.post('/api/flights', async (req, res) => {
  try {
    const { departure, destination, flightNumber, selectedSeats, selectedDate, selectedTime } = req.body;
    const sql = 'INSERT INTO flights (departure, destination, flight_number, seats, date, time) VALUES ($1, $2, $3, $4, $5, $6)';
    const values = [departure, destination, flightNumber, selectedSeats, selectedDate, selectedTime];

    await pool.query(sql, values);
    res.status(200).send('Flight added successfully.');
  } catch (err) {
    res.status(500).send('Error occurred while adding flight.');
  }
});



app.post('/api/book-seats', async (req, res) => {
  const { flightId, bookedSeats } = req.body;

  try {
    // Fetch the flight from the database
    const flight = await pool.query('SELECT * FROM flights WHERE id = $1', [flightId]);

    if (flight.rows.length === 0) {
      return res.status(404).json({ message: 'Flight not found' });
    }

    const currentSeats = flight.rows[0].seats;
    const availableSeats = currentSeats - bookedSeats;

    if (availableSeats < 0) {
      return res.status(400).json({ message: 'Not enough seats available' });
    }

    // Update the seats in the database
    await pool.query('UPDATE flights SET seats = $1 WHERE id = $2', [availableSeats, flightId]);

    return res.status(200).json({ message: 'Seats booked successfully' });
  } catch (error) {
    console.error('Error booking seats:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});



app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUserQuery = 'SELECT * FROM users WHERE email = $1';
    const userExists = await pool.query(checkUserQuery, [email]);

    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const insertUserQuery = 'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *';
    const newUser = await pool.query(insertUserQuery, [email, password]);

    res.status(201).json({ message: 'User registered successfully', user: newUser.rows[0] });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const userQuery = 'SELECT * FROM users WHERE email = $1 AND password = $2';
    const user = await pool.query(userQuery, [email, password]);

    if (user.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful', user: user.rows[0] });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});




app.delete('/api/flights/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const sql = 'DELETE FROM flights WHERE id = $1';
    await pool.query(sql, [id]);
    res.status(200).send(`Flight with ID ${id} deleted successfully.`);
  } catch (err) {
    res.status(500).send('Error occurred while deleting flight.');
  }
});



app.listen(Port, () => {
  console.log('Server is running on port 3001');
});
