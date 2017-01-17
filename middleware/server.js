var io = require('socket.io').listen(1180);
var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');

var con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: "root",
  password: "password1",
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

var app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.post('/newUser', function(req, res) {
    'use strict';
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'content-Type, Authorization, Content-Length, X-Requested-With, application/json');
    console.log("/newUser");
    console.log(req.body);
    var resp;

    if(req.body!=null){
		resp = userService.findOrCreateUser(req.body);
	}
    //res.send();
    res.sendStatus(resp);
});

app.listen(8080, function () {
  console.log('App listening on port 8080!')
})

