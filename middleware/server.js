var io = require('socket.io').listen(1180);
var mysql = require('mysql');

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

require('./socket-interface/server.js')(io);
require('./mysql-interface/user.js')(con);

