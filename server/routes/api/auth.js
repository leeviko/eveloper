const express = require("express");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");
const pool = require("../../config/db");
const router = express.Router();


/**
 * @route  POST api/auth
 * @desc   Authenticate user
 * @access Public
*/
router.post("/", [
  // Sanitize & Validate
  check("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Invalid syntax"),
  check("password")
    .trim()
    .escape()
    .isLength({ min: 4 })
    .withMessage("Password must be at least 4 letters long."),
], (req, res) => {
  // Check for errors during validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ msg: errors.array() });
  }
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = $1";

  pool.query(sql, [email], (err, result) => {
    if(err) {
      return  res.status(400).json({ msg: "Something went wrong" });
    }
    if(result.rowCount == 0) {
      return res.status(400).json({ msg: "Wrong email or password" });
    }

    const user = result.rows[0]

    // Compare password and hash
    bcrypt.compare(password, user.password, (err, isValid) => {
      if(!isValid) return res.status(400).json({ msg: "Wrong email or password" });

      // Save user to session store
      const sessUser = { name: user.name, uid: user.uid };
      req.session.user = sessUser;

      res.json({
        sessUser
      });

    })
  })
  
  
})

/**
 * @route  GET api/auth
 * @desc   Check if logged in & return cookie
 * @access Public
*/
router.get("/", (req, res) => {
  const sessUser = req.session.user;

  if(!sessUser) {
    return res.status(401).json({ msg: "Unauthorized" });
  } else {
    return res.json(sessUser);
  }
})




module.exports = router;