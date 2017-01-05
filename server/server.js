var http = require('http');
var mysql = require("mysql");

// First you need to create a connection to the db
var con = mysql.createConnection({
  host: "localhost",
  user: "dhrsoni",
  password: "",
  database: "CrappyBullet"
});

/*con.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  
  
  console.log('Connection established');
});*/

/*con.query('SELECT * FROM users',function(err,rows){
  if(err) throw err;

  console.log('Data received from Db:\n');
  console.log(rows);
});
*/
/*con.end(function(err) {
  // The connection is terminated gracefully
  // Ensures all previously enqueued queries are still
  // before sending a COM_QUIT packet to the MySQL server.
});*/

function testUser(id) {
    var isUser;
    con.query('SELECT * FROM users WHERE id = ?',[id],function(err,rows){
        if(err) throw err;
        
        console.log('Data received from Db:\n');
        console.log(rows);
        if(rows.leanght > 0){
          isUser = true;
        }else{
          isUser = false;
        }
    });
    con.end(function(err) {
    // The connection is terminated gracefully
    // Ensures all previously enqueued queries are still
    // before sending a COM_QUIT packet to the MySQL server.
    });
    
    return isUser;
}



http.createServer(function (req, res) {
    // Parse the entire URI to get just the pathnam
   // console.log(req.url);
    //var uri = url.parse(req.url).pathname, query;
    var uri = req.url;
        if (uri == "/hello"){
            req.setEncoding("utf8");
            req.content = '';
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('Hello World from /hello\n');
        }
        else if (uri == "/newLoging"){   
/*            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('Hello World from root\n');*/
            if(req.body.id){
              
            }
                    //call whatever you have in the current server.js
        }else{
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('Hello World!\n');          
        }
}).listen(process.env.PORT, process.env.IP);