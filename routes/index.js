var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var base = require('../Schema/enregistrement');



/* GET home page. */
router.get('/', function (req, res, next) {

    mongoose.connect('mongodb://localhost/bataille');
    const joueurs = mongoose.model('joueur', base);
    const pseudo = req.body.pseudo;

    //On verifie si le joueur est deja en base

    joueurs.find().sort('scores').exec(function (err, data) {

        //console.log("****" + data);
        res.render('index', {data});

    });






});

module.exports = router;
