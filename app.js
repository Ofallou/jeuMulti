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


//const ids=[]

let playerOnline = [];

io.on('connection', function (socket) {

    console.log('joueur connecté');

    socket.on('disconnect', function (socket) {
        console.log('Client disconnected !!');
    });

    io.sockets.emit('welcome', {welcome: " Bataille des chiffres"});

    socket.on('pseudo', function (data) {

        mongoose.connect('mongodb://localhost/quizz');
        const joueur = mongoose.model('joueur', base);

        joueur.find({pseudo: data}, function (err, data) {
            playerOnline.push(data[0]);
            console.log(playerOnline);
            socket.broadcast.emit('onlinePlayer', {playerOnline: playerOnline})
        });

        console.log(data);


    });


});


module.exports = {app: app, server: server};
