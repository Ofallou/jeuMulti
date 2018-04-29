const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const objectId = require('mongodb').ObjectID;
const enr = require('../Schema/enregistrement');


/* GET home page. */
router.post('/', function (req, res, next) {

    mongoose.connect('mongodb://localhost/bataille');
    const joueur = mongoose.model('joueur', enr);
    const pseudo = req.body.pseudo;

    //On verifie si le joueur est deja en base

    joueur.find({pseudo: pseudo}, function (err, data) {
        //console.log("****"+data)

        if (err) throw err;

        if (data[0] === undefined) {

            res.render('connexion', {errorLogin: "Joueur inconnu merci de vous inscrire "})

        } else if (data[0].pseudo === pseudo) {

            req.session.name = pseudo;
            res.render('online', {player: data[0]})

        }
    });
});


router.get('/', function (req, res, next) {

    if (req.session.name) {
        res.render('online', {user: req.session.name, userId: req.session._id});

    } else {

        res.render('connexion');
    }


});


module.exports = router;