var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var Schema = mongoose.Schema;
var objectId = require('mongodb').ObjectID;
var enr = require('../Schema/enregistrement');


router.get('/', function (req, res, next) {

    mongoose.connect('mongodb://localhost/bataille');
    //console.log(req.session.name);
    var deco = req.session.name;
    if (req.session.name) {

        req.session.destroy(function (err) {

            if (err) throw err;
            res.render('index', {message: "Joueur " + deco + " deconnecté"});

        })


    }

    mongoose.connection.close();
});

module.exports = router;