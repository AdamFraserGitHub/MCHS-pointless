var express = require('express');
var router = express.Router();
const path = require('path');

router.use('/scripts', express.static(__dirname + '/public/scripts'));
router.use('/styles', express.static(__dirname + '/public/styles'));
router.use('/images', express.static(__dirname + '/public/images'));
router.use('/audio', express.static(__dirname + '/public/audio'));

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'pages', 'home.html'));
});

router.get('/m', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'pages', 'mobleScoreboard.html'))
})

router.get('/controlPannel', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'pages', 'controlPannel.html'));
});

router.get('/scoreBoard', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'pages', 'newScoreboard.html'));
});

//temporary
router.get('/n', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'pages', 'scoreBoard.html'));
});

module.exports = router;