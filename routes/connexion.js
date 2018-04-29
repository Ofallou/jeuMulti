const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


/* GET home page. */
router.get('/', function (req, res, next) {
    mongoose.connect('mongodb://localhost/bataille');


    res.render('connexion');


});

module.exports = router;