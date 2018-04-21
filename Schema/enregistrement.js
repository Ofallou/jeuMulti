var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var objectId = require('mongodb').ObjectID;

var enregistrement = new Schema({

    nomComplet: String,
    pseudo: String,
    avatar: String,
    scores: [],
    date: {type: Date, default: Date.now}


});


module.exports = enregistrement;