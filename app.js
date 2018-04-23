'use strict';
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const Schema = mongoose.Schema;
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
//const io=require('express-socket.io');
const bodyParser = require('body-parser');
const base = require('./Schema/enregistrement');
const player = require('./public/javascripts/player');


const store = new MongoDBStore({
    uri: "mongodb://localhost:27017/quizz",
    colection: 'sessions'

});


const index = require('./routes/index');
const users = require('./routes/users');
const enr = require('./routes/enr');
const connexion = require('./routes/connexion');
const connect = require('./routes/connect');
const pseudo = require('./routes/pseudo');
const disconnect = require('./routes/disconnect');
const jeu = require('./routes/jeu');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(function (req, res, next) {
    res.io = io;
    next();
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
    secret: 'khemetologie',
    store: store, //stockage de la session en bd
    resave: false,
    saveUninitialized: false //n'enregistre la session une fois initialisée.

}));

//Uses des routes
app.use('/', index);
app.use('/users', users);
app.use('/enr', enr);
app.use('/connexion', connexion);
app.use('/disconnect/:id', disconnect);
app.use('/connect', connect);
app.use('/pseudo', pseudo);
app.use('/jeu', jeu);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


var getPlayers = function (pseudo) {
    mongoose.connect('mongodb://localhost/quizz');

    const joueur = mongoose.model('player', base);
    joueur.find({pseudo: pseudo}, function (err, data) {

        return data

    })


};






//Nombre de joueurs
let playerOnline = [];
let players = [];
let round = [];
let partie = 0;
let gamer = [];
let score = 0;
io.on('connection', function (socket) {

    console.log('joueur connecté');

    io.sockets.emit('welcome', {welcome: " Bataille des chiffres"});


    //Ajout des joueurs une fois connecté dans le tableau players
    socket.on('pseudo', function (pseudo) {
        mongoose.connect('mongodb://localhost/quizz');
        const joueur = mongoose.model('joueur', base);


        joueur.find({pseudo: pseudo}, function (err, pl) {
            //console.log("trouvé"+data)
            if (err) throw err;
            gamer.push(pl);
            console.log("les joueurs en base complet" + playerOnline);

        if (players.indexOf(pseudo) == -1) {
            players.push(pseudo);

            console.log("Liste des joueurs " + players);

            if (players.length === 2) {
                io.sockets.emit('on', {joueur: players, message: "Le jeu peur commencer !", gamers: gamer});

            } else if (players.length > 2) {

                io.sockets.emit('on', {joueur: players, message: "Partie deja en cours Merci de patienter la fin !!"});

            } else {

                socket.broadcast.emit('on', {joueur: players, message: "En attente du prochain joueur"});

            }


            socket.on('chiffre', function (data) {


                socket.on('score', function (data) {

                    console.log("les scores " + data.pseudo);
                    joueur.findOneAndUpdate({pseudo: data.pseudo}, {
                        '$set': {
                            scores: data.score
                        }
                    }, function (err) {

                        console.log(err);

                    })

                });


                let message = "";
                //console.log("contenu de data " + data.pseudo);
                //console.log(data);

                if (round.indexOf(data.pseudo) == -1) {

                    round.push(data);
                    round.forEach(function (item) {
                        //console.log("les items :" + item.pseudo)
                    })

                }

                if (round.length === 2) {
                    const joueur = mongoose.model('joueur', base);
                    let query = {};
                    if (round[0].chiffre > round[1].chiffre) {
                        message = round[0].pseudo + " gagne ! ";
                        score = score + 2


                    } else if (round[0].chiffre === round[1].chiffre) {
                        message = " pas de gagnant ! "
                    } else {

                        message = round[1].pseudo + " gagne ! ";
                        score = score + 2
                    }

                    round = [];
                } else {

                    message = "Attente !!";
                }
                partie++;
                //console.log(message);
                io.sockets.emit('carte', {data: data, message: message, partie: partie});

                console.log("**partie**" + partie)


            });


            socket.on('disconnect', function (socket) {
                players.splice(pseudo);
                console.log('Client disconnected !!');

                gamer = [];
            });
        }
        console.log(players);
        //console.log(pseudo);

        });
    });

});


module.exports = {app: app, server: server};
