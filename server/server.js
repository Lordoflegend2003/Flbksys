const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const auth = require("./Routers/Auth");
const { Pool } = require("pg");
const cors = require("cors");
require("dotenv").config();
const Port = process.env.PORT || 3001;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

app.use(bodyParser.json());
app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN,
  })
);

app.get("/api/flights", async (req, res) => {
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

app.post("/api/flights", async (req, res) => {
  try {
    const {
      departure,
      destination,
      flightNumber,
      selectedSeats,
      selectedDate,
      selectedTime,
    } = req.body;
    const sql =
      "INSERT INTO flights (departure, destination, flight_number, seats, date, time) VALUES ($1, $2, $3, $4, $5, $6)";
    const values = [
      departure,
      destination,
      flightNumber,
      selectedSeats,
      selectedDate,
      selectedTime,
    ];

    await pool.query(sql, values);
    res.status(200).send("Flight added successfully.");
  } catch (err) {
    res.status(500).send("Error occurred while adding flight.");
  }
});

app.get("/api/userdetails/:email", async (req, res) => {
  const { email } = req.params;
  const sql = "SELECT * FROM users WHERE email = $1";
  const result = await pool.query(sql, [email]);
  if (result.rows.length > 0) {
    res.json(result.rows[0]);
  } else {
    res.status(500).send("User not Details found");
  }
});

app.get("/api/flights-tickets/:emaill", async (req, res) => {
  try {
    const { emaill } = req.params;
    const sql = "SELECT * FROM user_tickets WHERE useremail = $1";
    const result = await pool.query(sql, [emaill]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).send("Error occurred while getting flight.");
  }
});

app.post("/api/book-seats", async (req, res) => {
  const {
    useremail,
    flightID,
    flightNumber,
    bookedSeats,
    destination,
    arrival,
    date,
    time,
  } = req.body;

  console.log(flightID, flightNumber);

  try {
    // Fetch the flight from the database

    const isavailable = await pool.query(
      "SELECT seats FROM flights WHERE id = $1",
      [flightID]
    );

    if (isavailable === 0) {
      return res.status(400).json({ message: "Not enough seats available" });
    }

    const query =
      "INSERT INTO user_tickets (useremail , flightID , flightNumber , bookedSeats , destination , arrival , date , time) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *";
    const values = [
      useremail,
      flightID,
      flightNumber,
      bookedSeats,
      destination,
      arrival,
      date,
      time,
    ];

    const flight = await pool.query(query, values);
    if (flight.rows.length > 0) {
      return res.status(200).json({ message: "Seats booked successfully" });
    } else {
      return res.status(500).json({ message: "Internal server error" });
    }

    const availableseats = isavailable - bookedSeats;

    const updateSeats = await pool.query(
      "UPDATE flights SET seats = $1 WHERE id = $2",
      [availableseats, flightID]
    );

    if (updateSeats.rows.length > 0) {
      return res.status(200).json({ message: "Seats Updated  successfully" });
    } else {
      return res.status(500).json({ message: "Internal server error" });
    }
  } catch (error) {
    console.error("Error booking seatsss:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const checkUserQuery = "SELECT * FROM users WHERE email = $1";
    const userExists = await pool.query(checkUserQuery, [email]);

    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const insertUserQuery =
      "INSERT INTO users (username , email, password) VALUES ($1, $2 , $3) RETURNING *";
    const newUser = await pool.query(insertUserQuery, [
      username,
      email,
      password,
    ]);

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser.rows[0] });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userQuery = "SELECT * FROM users WHERE email = $1 AND password = $2";
    const user = await pool.query(userQuery, [email, password]);

    if (user.rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.status(200).json({ message: "Login successful", user: user.rows[0] });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.delete("/api/flights/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const sql = "DELETE FROM flights WHERE email = $1";
    await pool.query(sql, [email]);
    res.status(200).send(`Flight with ID ${id} deleted successfully.`);
  } catch (err) {
    res.status(500).send("Error occurred while deleting flight.");
  }
});

app.delete("/api/:emaill/:flightNumber", async (req, res) => {
  try {
    const { emaill, flightNumber } = req.params;
    console.log(emaill, flightNumber);
    const sql =
      "Delete from user_tickets where useremail = $1 AND flightnumber = $2";
    const response = await pool.query(sql, [emaill, flightNumber]);
    res.sendStatus(200);
  } catch (err) {
    res.send(err).status(500);
  }
});

app.post("/api/adminauth", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const sql =
      "SELECT * FROM admin WHERE email = $1 AND password = $2 AND username = $3";
    const response = await pool.query(sql, [email, password, username]);

    if (response.rows.length > 0) {
      res.status(200).json(response.rows);
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    console.error("Error in admin authentication:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(Port, () => {
  console.log("Server is running on port 3001");
});
