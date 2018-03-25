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

    mongoose.connect('mongodb://localhost/quizz');
    const joueur = mongoose.model('joueur', enr);
    const pseudo = req.session.name;
    joueur.find({pseudo: pseudo}, function (err, data) {
        res.render('jeu', {joueur: data[0]})
    });

});


module.exports = router;