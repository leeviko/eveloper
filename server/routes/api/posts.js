const express = require("express");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();
const pool = require("../../config/db");

/**
 * @route  POST api/posts
 * @desc   Create new post
 * @access Private
*/
router.post("/", [
  check("title").escape().isLength({ max: 50, min: 4 }),
  check("content").isLength({ min: 10, max: 5000 }),
  check("tags").toArray().isArray({ max: 4, min: 1 }),
  check("author").escape().trim()
], auth, (req, res) => {
  // Check for errors during validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).json(errors.array());
  }

  let { title, content, tags, uid, bid } = req.body;

  tags = tags.map((tag) => {
    return tag.trim();
  });

  const newPost ={
    title,
    content,
    tags,
    uid,
    bid
  };


  const query = {
    name: "create-post",
    text: "INSERT INTO posts VALUES ($1, $2, $3, $4, $5)",
    values: [newPost.bid, newPost.uid, newPost.title, newPost.content, newPost.tags],
  }

  pool.query(query, (err, result) => {
    if(err) {
      if(err.code === "23505") {
        return res.status(400).json([{ msg: "Title is already on use" }])
      } else if(err.code === "23503") {
        return res.status(400).json([{ msg: "Author doesnt exist..." }])
      } else {
        return res.status(400).json([{ msg: newPost.bid }])
      }
    } 

    res.json({
      newPost
    })

  })

})

/**
 * @route  Get api/posts/search/:slug
 * @desc   Get posts by title
 * @access Public
*/
router.get("/search/:slug", [
  check("searchQuery").escape().trim().isLength({ min: 3 }).withMessage("Search must be at least 3 chars long.")
], (req, res) => {
  // Check for errors during validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }

  const searchQuery = req.params.slug;

  const sql = "SELECT * FROM posts WHERE title LIKE $1";

  pool.query(sql, ["%" + searchQuery + "%"], (err, result) => {
    if(err) {
      return res.status(400).json([{ msg: err }])
    }

    const posts = result.rows

    res.json({
      posts
    })

  })

})

/**
 * @route  Get api/posts/:slug
 * @desc   Get single post
 * @access Public
*/
router.get("/:slug/", [
  check("bid").escape().toLowerCase()
], (req, res) => {
  const bid = req.params.slug;

  const query = {
    name: "get-post",
    text: "SELECT * FROM posts WHERE bid = $1",
    values: [bid],
  }

  pool.query(query, (err, result) => {
    if(err) {
      return res.status(400).json([{ msg: err }])
    }

    const post = result.rows[0]

    res.json({
      post
    })

  })

})

/**
 * @route  POST api/posts/:slug/like
 * @desc   Like/unlike a post
 * @access Private
*/
router.post("/:slug/like", [
  check("bid").escape().trim(),
  check("uid").escape().trim()
], auth, (req, res) => {
  const bid = req.params.slug;
  const { uid } = req.body;

  let sql = "SELECT bid, uid FROM votes_blogs WHERE bid = $1 AND uid = $2";

  pool.query(sql, [bid, uid], (err, result) => {
    if(err) {
      return res.status(400).json([{ msg: err }])
    }

    if(result.rows == 0) {
      const vote_id = uuidv4();
    
      const newVote = {
        vote_id,
        uid,
        bid
      }
    
      const query = {
        name: "like-post",
        text: "INSERT INTO votes_blogs VALUES ($1, $2, $3)",
        values: [newVote.vote_id, newVote.uid, newVote.bid]
      }
    
      pool.query(query, (err, result) => {
        if(err) {
          return res.status(400).json([{ msg: err }])
        }
        
        // Get new like count
        sql = "SELECT bid from votes_blogs WHERE bid = $1";

        pool.query(sql, [bid], (err, result) => {
          if(err) {
            return res.status(400).json([{ msg: err }])
          }
          
          const likes = result.rows.length; 
          
          res.json({
            likes
          })
      
        })
    
      })
    } else {
      
      sql = "DELETE FROM votes_blogs WHERE bid = $1 AND uid = $2";

      pool.query(sql, [bid, uid], (err, result) => {
        if(err) {
          return res.status(400).json([{ msg: err }])
        }

        // Get new like count
        sql = "SELECT bid from votes_blogs WHERE bid = $1";

        pool.query(sql, [bid], (err, result) => {
          if(err) {
            return res.status(400).json([{ msg: err }])
          }
          
          const likes = result.rows.length; 
          
          res.json({
            likes,
          })
      
        })
        
      })

    }
  })

})

/**
 * @route  GET api/posts/:slug/likes
 * @desc   Get number of likes
 * @access Public
*/
router.get("/:slug/likes", (req, res) => {
  const bid = req.params.slug;

  const sql = "SELECT bid from votes_blogs WHERE bid = $1";

  pool.query(sql, [bid], (err, result) => {
    if(err) {
      return res.status(400).json([{ msg: err }])
    }
    const likes = result.rows.length; 
    
    res.json({
      likes
    })

  })

})

module.exports = router;