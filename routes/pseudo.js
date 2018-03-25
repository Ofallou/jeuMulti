var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var Schema = mongoose.Schema;
var objectId = require('mongodb').ObjectID;
var enr = require('../Schema/enregistrement');
mongoose.connect('mongodb://localhost/quizz');
var joueur = mongoose.model('joueur', enr);

/* GET home page. */
router.post('/', function (req, res, next) {

    var pseudo = req.body.pseudo;

    console.log(req.session.name);
    joueur.find({user: req.session.name}, function (err, data) {

        if (data.length) {

            console.log(data[0]._id);

            joueur.findByIdAndUpdate();

            res.render('jeu')

        } else {

            res.render('connect')
        }


    })

});

mongoose.connection.close();

module.exports = router;