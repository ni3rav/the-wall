const express = require("express");
const path = require("path");
const nunjucks = require("nunjucks");
const mongoose = require("mongoose");
const app = express();
const unName = require("./randomname");
const Comment = require("./schema");
const methodOverride = require("method-override");
const comment = require("./schema");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "nunjucks");
app.use(express.urlencoded({ extended: true }));

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

mongoose
  .connect("mongodb://localhost:27017/the-wall")
  .then((result) => {
    console.log("mongo connection open");
  })
  .catch((err) => {
    console.log("mongo connection error");
    console.log(err);
  });

// <------- route handling ------------->
app.get("/", async (req, res) => {
  const comments = await comment.find({});
  res.render("index.njk", {comments});
});

app.get("/new", (req, res) => {
  res.render("new.njk");
});

app.post("/new", async (req, res) => {
  const newComment = new Comment(req.body);
  await newComment.save();
  console.log(newComment);
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("listening on port 3000");
})
