var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/spacebookDB', function () {
  console.log("DB connection established!!!");
})

var Post = require('./models/postModel');

var app = express();
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/posts', function (req, res) {
  Post.find(function (error, data) {
    if (error) throw error;
    res.send(data);
  })
})

app.post('/posts', function (req, res) {
  var newPost = new Post(req.body);
  newPost.save(function (err, data) {
    if (err) throw err;
    else res.send(data);
  })
})

app.delete('/delete/:postId', function (req, res) {
  console.log(req.body);
  Post.findByIdAndRemove(req.params.postId, function (err, data) {
    if (err) throw err;
    else res.send();
  })
})

app.post('/posts/:postId/comment', function (req, res) {
  Post.findById(req.params.postId, function (err, data) {
    if (err) throw err;
    data.comments.push(req.body);
    data.save(function (err, data) {
      if (err) throw err;
      res.send(data)
      console.log(data);
    });
    //    
    // data.save(function (err, data) {
    //   if (err) throw err;
    //   else res.send(data);
    // })
  })
})


// var mypost=new Post ({
//     text: "hello world",
//    })
// mypost.comments.push({text: "hi shirly", username: "world"});
// mypost.save(function(err, data) {
//   if (err) {
//     console.error(err);
//   } else {
//     console.error(data);
//   }
// })


// You will need to create 5 server routes
// These will define your API:

// 1) to handle getting all posts and their comments
// 2) to handle adding a post
// 3) to handle deleting a post
// 4) to handle adding a comment to a post
// 5) to handle deleting a comment from a post

app.listen(8000, function () {
  console.log("what do you want from me! get me on 8000 ;-)");
});
