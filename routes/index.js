var express = require('express');
var router = express.Router();
var blogEngine = require('../db/blogEngine');
var userEngine = require('../db/userEngine')
var mongoose = require('mongoose');
/* GET home page. */
router.get('/', function(req, res) {
    blogEngine.getBlogEntries(function(entries) {
        var username = (req.session !== undefined) ? req.session.username : null
        res.render('index', { title: 'My Blog', entries: entries, username: username});
    })
});

router.get('/alison', function(req, res) {
    res.render('alison', {title: 'Alison'});
});

router.get('/article/:order', function(req, res) {
    blogEngine.getBlogEntry(req.params.order, function(entry) {
        var username = (req.session !== undefined) ? req.session.username : null
        res.render('article', {title: entry.title, blog: entry, username: username} )
    })
});

router.get('/login', function(req, res) {
    res.render('login')
});

router.post('/login', function(req, res) {
    userEngine.auth(req.body, function(valid) {
        if (valid) {
            req.session.username = req.body.username
            res.redirect('/')
        }
        else {
            res.redirect('/login')  // stay on login page for now, change to error page later
        }
    })
})

router.get('/signup', function(req, res) {
    res.render('signup')
});

router.post('/signup', function(req, res) {
    userEngine.signup(req.body, function() {
        req.session.username = req.body.username
        res.redirect('/')
    })
});

router.get('/forgot', function(req, res) {
    res.render('forgot')
});

router.post('/forgot', function(req, res) {
    userEngine.forgot(req.body, function() {
        res.redirect('/login')
    })
});

router.get('/logout', function(req, res) {
    req.session.destroy(function(){
        res.redirect('/')
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
