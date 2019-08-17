//jshint esversion:6
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose")

mongoose.connect(process.env.MONGO_URI ,{useNewUrlParser: true});

const homeStartingContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Et aspernatur illo non quae qui officia quod pariatur saepe? Unde molestias facere voluptatum, praesentium esse illum voluptatem vel est facilis optio dignissimos amet illo voluptatibus, sint eos doloremque rerum. Minus, nam? Quos, optio consequatur. Et, sint optio dolores doloremque voluptates eveniet neque ea explicabo quidem alias quae molestiae quis temporibus perspiciatis reiciendis accusamus error rerum vel modi ducimus quos accusantium. Odio, incidunt doloribus. In accusamus natus obcaecati repellendus veniam odit, expedita voluptatibus sunt quas, numquam ipsum. Maiores, animi! Nam asperiores beatae deserunt aperiam nulla excepturi obcaecati fuga veritatis, dicta rerum voluptatem?.";
const aboutContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Et aspernatur illo non quae qui officia quod pariatur saepe? Unde molestias facere voluptatum, praesentium esse illum voluptatem vel est facilis optio dignissimos amet illo voluptatibus, sint eos doloremque rerum. Minus, nam? Quos, optio consequatur. Et, sint optio dolores doloremque voluptates eveniet neque ea explicabo quidem alias quae molestiae quis temporibus perspiciatis reiciendis accusamus error rerum vel modi ducimus quos accusantium. Odio, incidunt doloribus. In accusamus natus obcaecati repellendus veniam odit, expedita voluptatibus sunt quas, numquam ipsum. Maiores, animi! Nam asperiores beatae deserunt aperiam nulla excepturi obcaecati fuga veritatis, dicta rerum voluptatem?.";
const contactContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Et aspernatur illo non quae qui officia quod pariatur saepe? Unde molestias facere voluptatum, praesentium esse illum voluptatem vel est facilis optio dignissimos amet illo voluptatibus, sint eos doloremque rerum. Minus, nam? Quos, optio consequatur. Et, sint optio dolores doloremque voluptates eveniet neque ea explicabo quidem alias quae molestiae quis temporibus perspiciatis reiciendis accusamus error rerum vel modi ducimus quos accusantium. Odio, incidunt doloribus. In accusamus natus obcaecati repellendus veniam odit, expedita voluptatibus sunt quas, numquam ipsum. Maiores, animi! Nam asperiores beatae deserunt aperiam nulla excepturi obcaecati fuga veritatis, dicta rerum voluptatem?.";

const app = express();

const postSchema = {
  title : String,
  content : String
};

const Post = mongoose.model("Post", postSchema);

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.get("/", function(req,res){

  Post.find({}, function(err, posts){

  res.render("home", {

    content: homeStartingContent,

    posts: posts
    });
});
});

app.get('/about', function (req, res) {
  res.render('about', {
    content: aboutContent
  });
});

app.get('/contact', function (req, res) {
  res.render('contact', {
    content: contactContent
  });
});

app.get('/compose', function (req, res) {
  res.render('compose');
});

app.post("/compose", function (req, res) {
  
  const post = new Post({
    title: req.body.title,
    content: req.body.body
  });   
  post.save(function(err){
    if (!err){
      res.redirect("/");
    }
  });
});

app.get('/posts/:postId', function (req, res) {
  const requestedId = req.params.postId;
  //  requestedId = requestedId.trim();
  
  Post.findOne({_id: requestedId}, function(err, item){
    res.render("post", {
      title: item.title,
      content: item.content
    });
  });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
