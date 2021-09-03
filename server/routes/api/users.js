const express = require("express");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const { check, validationResult } = require("express-validator");
const pool = require("../../config/db");
const router = express.Router();


/**
 * @route  POST api/users
 * @desc   Register new user
 * @access Public
*/
router.post("/", [
  // Sanitize & Validate
  check("name")
    .trim()
    .escape()
    .isLength({ min: 4 })
    .withMessage("Must be at least 4 letters long."),
  check("email")
    .trim()
    .escape()
    .isEmail()
    .withMessage("Invalid syntax"),
  check("password")
    .trim()
    .escape()
    .isLength({ min: 4 })
    .withMessage("Password must be at least 4 letters long.")
], (req, res) => {
  // Check for errors during validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ msg: errors.array() });
  }

  const { name, email, password } = req.body;
  const id = uuidv4();

  const newUser = {
    name,
    email,
    password,
    id
  }

  // Check if user already exists
  const sql = "SELECT email FROM users WHERE email = $1";

  pool.query(sql, [newUser.email], (err, result) => {
    if(err) {
      return  res.status(400).json({ msg: "Something went wrong" });
    }
    if(result.rowCount == 1) {
      return res.status(400).json({ msg: "Email is already on use" });
    }

  })

  // Hash password
  bcrypt.hash(password, 10, (err, hash) => {
    if(err) {
      return res.status(400).json({ msg: "Something went wrong" });
    }

    newUser.password = hash

    // Store to db
    const query = {
      name: "create-user",
      text: "INSERT INTO users VALUES ($1, $2, $3, $4)",
      values: [newUser.id, newUser.email, newUser.password, newUser.name],
    }

    pool.query(query, (err, result) => {
      if(err) {
        return res.status(400).json({ msg: "Something went wrong" });
      }

      res.json({
        newUser
      })
    })

  })

})

module.exports = router;