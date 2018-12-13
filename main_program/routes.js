var express = require('express');
var router = express.Router();
const path = require('path');

router.use('/styles', express.static('public/styles'));
router.use('/scripts', express.static('public/scripts'));
router.use('/images', express.static('public/images'));

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'pages', 'home.html'));
});

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