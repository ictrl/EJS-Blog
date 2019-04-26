//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Et aspernatur illo non quae qui officia quod pariatur saepe? Unde molestias facere voluptatum, praesentium esse illum voluptatem vel est facilis optio dignissimos amet illo voluptatibus, sint eos doloremque rerum. Minus, nam? Quos, optio consequatur. Et, sint optio dolores doloremque voluptates eveniet neque ea explicabo quidem alias quae molestiae quis temporibus perspiciatis reiciendis accusamus error rerum vel modi ducimus quos accusantium. Odio, incidunt doloribus. In accusamus natus obcaecati repellendus veniam odit, expedita voluptatibus sunt quas, numquam ipsum. Maiores, animi! Nam asperiores beatae deserunt aperiam nulla excepturi obcaecati fuga veritatis, dicta rerum voluptatem?.";
const aboutContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Et aspernatur illo non quae qui officia quod pariatur saepe? Unde molestias facere voluptatum, praesentium esse illum voluptatem vel est facilis optio dignissimos amet illo voluptatibus, sint eos doloremque rerum. Minus, nam? Quos, optio consequatur. Et, sint optio dolores doloremque voluptates eveniet neque ea explicabo quidem alias quae molestiae quis temporibus perspiciatis reiciendis accusamus error rerum vel modi ducimus quos accusantium. Odio, incidunt doloribus. In accusamus natus obcaecati repellendus veniam odit, expedita voluptatibus sunt quas, numquam ipsum. Maiores, animi! Nam asperiores beatae deserunt aperiam nulla excepturi obcaecati fuga veritatis, dicta rerum voluptatem?.";
const contactContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Et aspernatur illo non quae qui officia quod pariatur saepe? Unde molestias facere voluptatum, praesentium esse illum voluptatem vel est facilis optio dignissimos amet illo voluptatibus, sint eos doloremque rerum. Minus, nam? Quos, optio consequatur. Et, sint optio dolores doloremque voluptates eveniet neque ea explicabo quidem alias quae molestiae quis temporibus perspiciatis reiciendis accusamus error rerum vel modi ducimus quos accusantium. Odio, incidunt doloribus. In accusamus natus obcaecati repellendus veniam odit, expedita voluptatibus sunt quas, numquam ipsum. Maiores, animi! Nam asperiores beatae deserunt aperiam nulla excepturi obcaecati fuga veritatis, dicta rerum voluptatem?.";

const app = express();

let items = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get('/', function (req, res) {
  res.render('home', {
    content: homeStartingContent,
    items: items,
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
  const post = {
    title: req.body.title,
    content: req.body.body
  };

  items.push(post);
  res.redirect('/');
});

app.get('/posts/:topic', function (req, res) {
  const requestedTitle = _.lowerCase(req.params.topic);

  items.forEach(function (item) {
    const storedTitle = _.lowerCase(item.title);

    if (storedTitle === requestedTitle) {
      res.render('post', {
        title: item.title,
        content: item.content
      })
    }
  });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});