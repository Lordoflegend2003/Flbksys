const express = require("express");
const pool = require("../db");
const newrequest = async (req, res) => {
    try {
      const { username , email, password } = req.body;
      const selectQuery = "SELECT * FROM users WHERE username = $1";
      const selectValues = [username];
      const resultAlready = await pool.query(selectQuery, selectValues);
  
      if (resultAlready.rows.length > 0) {
        res.status(401).json("User Already Exists");
      } else {
        const insertQuery = "INSERT INTO users (username , email, password) VALUES ($1, $2 , $3) RETURNING *";
        const insertValues = [username , email, password];
        const resultInsert = await pool.query(insertQuery, insertValues);
  
        res.status(200).json(resultInsert.rows[0]);
      }
    } catch (err) {
      console.error("Error in newrequest:", err);
      res.status(500).json("Something went wrong");
    }
  };
  
  const getrequest = async (req, res) => {
    try {
      const { username , email, password } = req.body;
      const sql = "SELECT * FROM users WHERE username = $1 AND email = $2 AND password = $3 ";
      const values = [username , email, password];
      const result = await pool.query(sql, values);
  
      if (result.rows.length > 0) {
        res.status(200).json(result.rows[0]);
      } else {
        res.status(401).json("User Doesn't Exist");
      }
    } catch (err) {
      console.error("Error in getrequest:", err);
      res.status(500).json("Something went wrong");
    }
  };
  
  module.exports = { newrequest, getrequest };