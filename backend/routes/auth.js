const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel");
const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const protectedRoute = require("../middleware/protectedResource");

dotenv.config();

router.get("/", (req, res) => {
  res.send("Welcome");
});

router.get("/secured", protectedRoute, (req, res) => {
  res.send("Secured Area");
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required!" });
  }
  userModel
    .findOne({ email: email })
    .then((dbUser) => {
      if (!dbUser) {
        return res.status(400).json({ message: "User doesn't exist!" });
      } else {
        bcryptjs
          .compare(password, dbUser.password)
          .then((isMatch) => {
            if (isMatch) {
              //res.status(200).json({message: "Login successful"});
              const jwtToken = jwt.sign(
                { _id: dbUser._id },
                process.env.JWT_SECRET
              );
              const { _id, fullName, email } = dbUser;
              res.json({ token: jwtToken, userInfo: { _id, fullName, email } });
            } else {
              res.status(400).json({ message: "Invalid credentials" });
            }
          })
          .catch((error) => {
            console.log(error);
            res.status(500).json({ message: "Error occured!", error });
          });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "An error occured!", error });
    });
});

router.post("/register", (req, res) => {
  console.log(req.body);
  const { fullName, password, email } = req.body;
  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "Please fill the required fields" });
  }
  userModel
    .findOne({ email: email })
    .then((dbUser) => {
      if (dbUser) {
        return res
          .status(400)
          .json({ message: "User with this email already exists!" });
      }
      bcryptjs
        .hash(password, 16)
        .then((hashedPassword) => {
          const user = new userModel({
            fullName,
            email,
            password: hashedPassword,
          });
          user
            .save()
            .then((u) => {
              res.status(201).json({ message: "Registation successful" });
            })
            .catch((error) => {
              res.status(500).json({ message: "An error occured!", error });
            });
        })
        .catch((error) => {
          res
            .status(500)
            .json({ message: "An error occured hashing the password!" });
        });
    })
    .catch((error) => {
      res.status(500).json({ message: "An error occured!", error });
    });
});

module.exports = router;
