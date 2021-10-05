const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router()
const pool = require("../../config/db");

/**
 * @route  GET api/search/users/:slug
 * @desc   Search for users
 * @access Public
*/
router.get("/users/:slug", [
  check("searchQuery"),
], (req, res) => {
  const searchQuery = req.params.slug;
  // Check for errors during validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }

  let usersRes;

  sql = "SELECT uid, email, name, createdat, description FROM users WHERE name LIKE $1 OR uid = $2";

  pool.query(sql, ["%" + searchQuery + "%", searchQuery], (err, result) => {
    if(err) {
      return res.status(400).json([{ msg: err }])
    }

    usersRes = result.rows;
    
    res.json({
      usersRes
    });
  });

})

/**
 * @route  GET api/search/posts/:slug
 * @desc   Search for posts
 * @access Public
*/
router.get("/posts/:slug", [
  check("searchQuery")
], (req, res) => {
  const searchQuery = req.params.slug;
  // Check for errors during validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }

  let postsRes;

  sql = "SELECT * FROM posts WHERE title LIKE $1";

  pool.query(sql, ["%" + searchQuery + "%"], (err, result) => {
    if(err) {
      return res.status(400).json([{ msg: err }])
    }

    postsRes = result.rows;

    res.json({
      postsRes
    });
  });

})

/**
 * @route  GET api/search/recentFeed
 * @desc   Get recent posts
 * @access Public
*/
router.get("/recentFeed", (req, res) => {
  
  const sql = "SELECT * FROM posts ORDER BY createdat LIMIT 50"

  pool.query(sql, (err, result) => {
    if(err) {
      return res.json([{ msg: err }])
    }

    const recentResult = result.rows

    res.json({
      recentResult
    })

  })

})

/**
 * @route  GET api/search/topFeed
 * @desc   Get top posts
 * @access Public
*/
router.get("/topFeed", (req, res) => {

  const sql = "SELECT posts.*, (SELECT COUNT(*) FROM post_likes WHERE post_likes.bid = posts.bid) AS LIKES FROM posts ORDER BY LIKES desc";

  pool.query(sql, (err, result) => {
    if(err) {
      return res.status(400).json([{ msg: err }])
    }

    topResult = result.rows;

    res.json({
      topResult
    })

  })

})

module.exports = router;