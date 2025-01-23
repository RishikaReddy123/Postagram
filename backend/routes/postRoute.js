const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const postModel = require("../models/postModel");

const protectedRoute = require("../middleware/protectedResource");

router.get("/posts", (req, res) => {
  postModel
    .find()
    .populate("author", "_id fullName email")
    .then((dbPosts) => {
      res.status(200).json({ posts: dbPosts });
    })
    .catch((error) => {
      console.error("Error fetching posts:", error.message);
      res
        .status(500)
        .json({ message: "Error occurred!", error: error.message });
    });
});

router.get("/myposts", protectedRoute, (req, res) => {
  postModel
    .find({ author: req.dbUser._id })
    .populate("author", "_id fullName email")
    .then((dbPosts) => {
      res.status(200).json({ posts: dbPosts });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Error occured!", error });
    });
});

router.post("/createpost", protectedRoute, (req, res) => {
  console.log("Authenticated user:", req.dbUser);
  const { title, body, image } = req.body;
  if (!title || !body || !image) {
    return res.status(400).json({ message: "Title and body are required!" });
  }
  req.dbUser.password = undefined;
  const post = new postModel({
    title: title,
    body: body,
    image: image,
    author: req.dbUser,
  });
  post
    .save()
    .then((dbPost) => {
      res.status(201).json({ post: dbPost });
      console.log(post);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Error occured!", error });
    });
  console.log("Request body:", req.body);

  console.log("Authenticated user:", req.dbUser);
});

module.exports = router;
