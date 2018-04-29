const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const objectId = require('mongodb').ObjectID;
const pl=require('../../Schema/enregistrement')




 var getPlayer=function(pseudo){

    mongoose.connect('mongodb://localhost/quizz');

    console.log('marche ou pas ???')
    const player = mongoose.model('player', pl);
    player.find({pseudo: pseudo}, function (err, data) {

        console.log(err);



    });


};

module.exports=getPlayer;