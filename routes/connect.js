const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const objectId = require('mongodb').ObjectID;
const enr = require('../Schema/enregistrement');
/* GET home page. */
router.post('/', function (req, res, next) {

    mongoose.connect('mongodb://localhost/quizz');
    const joueur = mongoose.model('joueur', enr);
    const pseudo = req.body.pseudo;
    joueur.find({pseudo: pseudo}, function (err, data) {
        if (data[0].pseudo === pseudo) {
            req.session.name = pseudo;
            res.render('online', {online: data})

        } else {
            res.render('connexion', {errorLogin: "Joueur inconnu merci de vous inscrire "})
        }
    });
});


router.get('/', function (req, res, next) {

    if (req.session.name) {
        res.render('connect', {user: req.session.name, userId: req.session._id});

    } else {

        res.render('connexion');
    }


});


module.exports = router;