const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const Schema = mongoose.Schema;
const objectId = require('mongodb').ObjectID;
const enr = require('../Schema/enregistrement');


/* GET home page. */
router.get('/', function (req, res, next) {
    mongoose.connect('mongodb://localhost/quizz');

    if (req.session.name) {
        //res.io.emit("socketToMe","toto")

        res.render('online', {pseudo: req.session.name, userId: req.session._id})

    }

    res.render('connexion');

    // mongoose.connection.close();
});

module.exports = router;