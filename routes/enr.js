var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var objectId = require('mongodb').ObjectID;


var enregistrement = new Schema({

    nomComplet: String,
    pseudo: String,
    avatar: String,
    score: [],
    idSocket: String,
    date: {type: Date, default: Date.now}

});

var joueurs = mongoose.model('joueurs', enregistrement);

//Connexion a la base avec mongoose
/* GET home page. */
//gestion de l'enregistrement des joueurs et enregistrement en base
router.post('/', function (req, res, next) {
    mongoose.connect('mongodb://localhost/quizz');

    console.log(req.body.avatar);

    //On valide que le client qui s'enregistre n'est pas deja present en base via un user
    joueurs.find({pseudo: req.body.pseudo}, function (err, data) {

        if (data.length > 0) {
            console.log('user deja existant');
            res.render('connexion', {error: "Le nom d'utilisateur existe deja !!"});

        } else {

            var joueur = new joueurs({
                nomComplet: req.body.nomComplet,
                pseudo: req.body.pseudo,
                avatar: req.body.avatar,
                scores: [],

            });
            req.session.name = joueur.pseudo;
            //le jouer est enregistré en base
            joueur.save(function (err) {
                if (err) console.log(err);

                console.log(joueur);

                req.session.name = joueur.pseudo;
                res.render('online', {player: joueur})

                //mongoose.connection.close();
            })
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