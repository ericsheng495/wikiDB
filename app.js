//jshint esversion:6

//requiring prev installed npm modules
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

//creating new app instance to use express
const app = express();

//use ejs as templating
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

//store static files
app.use(express.static("public"));

//setting up mongodb
mongoose.connect("mongodb://0.0.0.0:27017/wikiDB",{useNewUrlParser: true});

//creating schemas
const articleSchema = {
  title: String,
  content: String
};

// creating models
const Article = mongoose.model("article", articleSchema);

//creating get route that fetches all articles
app.get("/articles", function(req,res){
  //find all articles
  Article.find(function(err, foundArticles){
    // console.log(foundArticles);
    if(!err){
      res.send(foundArticles);
    }
    res.send(err);
  });
});






app.listen(3000, function() {
  console.log("Server started on port 3000");
});
