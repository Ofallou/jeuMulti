const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const objectId = require('mongodb').ObjectID;
<<<<<<< HEAD
const pl=require('../../Schema/enregistrement')




 var getPlayer=function(pseudo){

    mongoose.connect('mongodb://localhost/quizz');

    console.log('marche ou pas ???')
=======
const pl = require('../../Schema/enregistrement');


var getPlayer = function (pseudo) {

    mongoose.connect('mongodb://localhost/quizz');

    console.log('marche ou pas ???');
>>>>>>> 58d8a4c793146ef9ead4aaa5e8ddc15238c434d5
    const player = mongoose.model('player', pl);
    player.find({pseudo: pseudo}, function (err, data) {

        console.log(err);


<<<<<<< HEAD

=======
>>>>>>> 58d8a4c793146ef9ead4aaa5e8ddc15238c434d5
    });


};

<<<<<<< HEAD
module.exports=getPlayer;
=======
module.exports = getPlayer;
>>>>>>> 58d8a4c793146ef9ead4aaa5e8ddc15238c434d5
