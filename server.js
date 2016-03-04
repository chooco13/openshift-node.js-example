var express = require('express')
var bodyParser = require('body-parser')
var Post = require('./model/post')

var app = express()
app.use(bodyParser.json())

app.get('/', function(req, res) {
  res.sendFile('layouts/posts.html', { root: __dirname })
})

app.get('/api/posts', function(req, res, next) {
  Post.find(function(err, posts) {
    if (err) {
      return next(err)
    }
    res.json(posts)
  })
})

app.post('/api/posts', function(req, res, next) {
  var post = new Post({
    username: req.body.username,
    body: req.body.body
  })

  post.save(function(err, post) {
    if (err) {
      return next(err)
    }
    res.status(201).json(post)
  })
})

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

app.listen(server_port, server_ip_address, function() {
  console.log("Listening on " + server_ip_address + ", server_port " + server_port)
});
