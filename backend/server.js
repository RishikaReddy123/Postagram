const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

mongoose.connection.on("connected", () => {
  console.log("connected");
});

mongoose.connection.on("error", (error) => {
  console.log("error", error);
});

const userModel = require("./models/userModel");
const postModel = require("./models/postModel");

app.use(require("./routes/auth"));
app.use(require("./routes/postRoute"));

app.get("/", (req, res) => {
  res.send("Welcome!");
});

app.listen(5000, () => {
  console.log("App is listeniing on port 5000");
});
