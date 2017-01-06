var io = require('socket.io').listen(1180);
var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');

var con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE
}, function(err){
  console.log(err);
});

con.connect(function(err){
  if(err){
    console.log(err);
    return;
  }
  console.log("connection successful");
});

var userService = require('./mysql-interface/user.js')(con);
var messageService = require('./mysql-interface/message.js')(con);
require('./socket-interface/server.js')(io, userService, messageService);

var app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.post('/newUser', function(req, res) {
    'use strict';
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'content-Type, Authorization, Content-Length, X-Requested-With, application/json');

    //collection.update({"token": req.body.token }, {"ID":req.body.ID, "token": req.body.token }, {upsert:true});
    //console.log(req.body.uid);
    //console.log(req.body.displayName);
    console.log("priting req");
    console.log(req.body);

    //res.send();
    res.sendStatus(200);
});

app.listen(8080, function () {
  console.log('App listening on port 3000!')
})

