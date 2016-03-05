var express = require('express')
var router = require('express').Router()
var path = require('path')

router.use(express.static(path.resolve('assets')))

router.get('/', function(req, res) {
  res.sendFile(path.resolve('layouts/posts.html'))
})

module.exports = router
