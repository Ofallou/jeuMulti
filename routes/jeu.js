const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
//var MongoClient = require('mongodb').MongoClient;
//var Schema=mongoose.Schema;
//var objectId = require('mongodb').ObjectID;
const enr = require('../Schema/enregistrement');
//mongoose.connect('mongodb://localhost/quizz');
/* GET users listing. */
router.get('/', function (req, res, next) {


    res.render('jeu');


});


module.exports = router;