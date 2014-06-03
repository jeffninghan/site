var express = require('express');
var router = express.Router();
var blogEngine = require('../db/blog');
var mongoose = require('mongoose');
/* GET home page. */
router.get('/', function(req, res) {
    blogEngine.getBlogEntries(function(entries) {
         res.render('index', { title: 'My Blog', entries: entries });
    })
});

router.get('/alison', function(req, res) {
    res.render('alison', {title: 'Alison'});
});

router.get('/article/:order', function(req, res) {
    blogEngine.getBlogEntry(req.params.order, function(entry) {
        res.render('article', {title: entry.title, blog: entry} )
    })
});

router.post('/add_post', function(req, res) {
    res.render('add_post', {title: 'Add Post'})
});

router.post('/submit_post', function(req, res) {
    blogEngine.createBlogEntry(req.body, function(){
        res.redirect('/');
    })
})

module.exports = router;
