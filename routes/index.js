var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var base = require('../Schema/enregistrement');


/* GET home page. */
router.get('/', function (req, res, next) {


    res.render('index');


});

module.exports = router;
