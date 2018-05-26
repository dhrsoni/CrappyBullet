var io = require('socket.io').listen(1180);
var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
//var http = require('http');
var admin = require("firebase-admin");
var env = require('node-env-file');
var gcm = require('node-gcm');
var request = require('ajax-request');
env('./.env');

var serviceAccount = require("./friendlyc-b831c-firebase-adminsdk-6zz68-90905c4fb7.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://friendlyc-b831c.firebaseio.com"
});

//var registrationToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImM4YTI4NDRmODE4MGUyMmRjZTVhYzA3YTE4ZGEwYmI5NjdlOTBkMTEifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZnJpZW5kbHljLWI4MzFjIiwibmFtZSI6IkRyZXcgU29ueSIsInBpY3R1cmUiOiJodHRwczovL2xoNS5nb29nbGV1c2VyY29udGVudC5jb20vLTVjNW9NWlhIZ1dFL0FBQUFBQUFBQUFJL0FBQUFBQUFBQUFBL0FLVGFlSzhJNGRqSmExZHN3VzhTTkd6LUR0S3VfSzNXdlEvczk2LWMvcGhvdG8uanBnIiwiYXVkIjoiZnJpZW5kbHljLWI4MzFjIiwiYXV0aF90aW1lIjoxNTE0OTU3OTgzLCJ1c2VyX2lkIjoidW43QmRXd2tzYVlSVkg5UWM4bTJEMWlUWTFuMSIsInN1YiI6InVuN0JkV3drc2FZUlZIOVFjOG0yRDFpVFkxbjEiLCJpYXQiOjE1MTUxMDc5MTcsImV4cCI6MTUxNTExMTUxNywiZW1haWwiOiJkcmV3c29ueTE5OTRAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMDk0NTI4NTE3OTk2MzIyMzQ2MDIiXSwiZW1haWwiOlsiZHJld3NvbnkxOTk0QGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.mfAIYG1iyhtQCZ4eVFlLZFD7Ylr0E1c89r_7P5PXJgnOTPh7JYPfa9zgEwYBB7rycwX5-oLlGx-IfUtUJb96pvTq2tLV2MgZSebNcPKQQUBJYSJyVaRY6R6jZc7JVAnQHxY3KvnBogyZFbnPGU5ISgAhgGYZZ7Awzo9sUlhy68tPrF72V9K5aNGTqMMuihj-SDu9-ZVIre8trgkuzOGBJGMFTqrbkyCQ9Vjh73_zdV0-6QJxxWPdIC0Dom6wBQD_-SkHpWMrYyNzf7aAawGWWRivzhb7j4uV1IRUuEKS3P0eH7qN-BKiLXv5sxJT5WCNqYOKvpJPJ33iVkPAtA_jQg";


var con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: "root",
  password: "password",
  database: process.env.DB_DATABASE,
  multipleStatements: true
}, function(err){
  console.log(err);
});

con.connect(function(err){
  if(err){
    console.log(err);
    return;
  }
  console.log("connection successful");
  console.log(process.env.DB_DATABASE);
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
    //console.log(req.body);
    var resp;

    if(req.body!=null){
     // resp = userService.findOrCreateUser(req.body);
     //console.log("req.body.fmcID: "+req.body.fcmID);
     //console.log("req.body.email: "+req.body.email);
     var checkTokenEntry = userService.checkTokenEntry(req.body.fcmID);
     var checkUserEntry = userService.checkUserEntry(req.body.email);

     Promise.all([checkTokenEntry,checkUserEntry]).then(function(data){
        if(data[0] == 0 && data[1]== 0){
          console.log("about to wait for create group");
          var notificationKeyPromice = createGroup(req.body);
          Promise.all([notificationKeyPromice]).then(function(key){
            var notificationKey = key;
            console.log("notificationKey: ");
            if(notificationKey[0].notification_key != undefined){
              console.log(notificationKey[0].notification_key);
              var newUser = userService.findOrCreateUser(req.body,notificationKey[0].notification_key);
              //var fmcKeyEntry = userService.insertFcmToken(req.body);
            }else{
              console.log("notificationKey: undefined");
              res.sendStatus(500);
              return;
            }
            Promise.all([newUser]).then(function(userinfo){
              if(userinfo[0]!=null && userinfo[1] != null){
                res.send({result:"success"})
                console.log("Done!!! ")
                return;
              }else{
                console.log(userinfo);
                res.sendStatus(500);
              }
            }).catch(function(err) {
              console.log("Error in sql somewhere!! ");
              console.log(err); // some coding error in handling happened
            });
          }).catch(function(err) {
            console.log("Error is error");
            console.log(err); // some coding error in handling happened
          });

          //var notificationKey = "somenotificationtoken"

        }else if(data[0] == 0 && data[1]==1){
          console.log("data[0] == 0 && data[1]==1");
          var notification_keypromice =  userService.getNotificationToken(req.body);
          var User_ID = data[1][0].id;
          var fmcKeyEntry = userService.insertFcmToken(req.body,User_ID);
          //var obj = addToGroup(req.body,notification_key);
          
          Promise.all([notification_keypromice,fmcKeyEntry]).then(function(keys){
            console.log("data[0].notification_key");
            var arrdata = keys[0];
            var notification_key =arrdata[0].notification_key ;
            console.log(req.body);
            var addtogroup = addToGroup(req.body,notification_key);
            Promise.all([addtogroup]).then(function(data){        
              console.log("Done!!!");
              res.send({result:"success"})
              return;
            }).catch(function(err) {
              console.log("Error in adding to group!! ");
              console.log(err); // some coding error in handling happened
            });
          }).catch(function(err) {
              console.log("Error in sql somewhere!! ");
              console.log(err); // some coding error in handling happened
          });
        }else if(data[0] == 1 && data[1]==1){
          console.log("data[0] == 1 && data[1]==1");
          res.send({result:"success"})
        }else{
          console.log("sending error");
          res.sendStatus(500);
        }


      });


	  }
    //res.send();

});


 function createGroup(input){
  console.log(input);
  var user1 = {
    operation: "create",
    notification_key_name: input.email+"25",
    registration_ids: [input.fcmID]  
  };
  var header = {ContentType:"application/json",Authorization:"key=AIzaSyDapDGjhUAKvgqsl9pa2lDGnCAot3B3k90",project_id:"21116217672"}
  return new Promise(function(resolve, reject) {
    console.log("createGroup()");
    

      request.post({
        url: 'https://android.googleapis.com/gcm/notification',
        data: user1,
        headers: header
      },function(error, response, body){
        console.log("createGroup result");
        console.log(body);
        var obj = JSON.parse(body);
        return resolve(obj);
      });

    });
}

function addToGroup(input,notification_key){
  var user1 = {
    operation: "add",
  notification_key_name: input.email+"25",
  notification_key: notification_key,
  registration_ids: [input.fcmID]};
  
  var header = {ContentType:"application/json",Authorization:"key=AIzaSyDapDGjhUAKvgqsl9pa2lDGnCAot3B3k90",project_id:"21116217672"}
  return new Promise(function(resolve, reject) {
  request.post({
    url: 'https://android.googleapis.com/gcm/notification',
    data: user1,
    headers: header
  },function output(error, response, body){
      var obj = JSON.parse(body);
      console.log("add to group output");
      console.log(body);
      if(obj.notification_key != null){
        return resolve(obj.nonotification_key);
      }else{
        return reject(obj);
      }
    }
  )

});

}

function output(error, response, body){
  var obj = JSON.parse(body);

  if(obj.nonotification_key != null){

  }

}

app.post('/msgReceived', function(req, res) {
  'use strict';
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'content-Type, Authorization, Content-Length, X-Requested-With, application/json');
  //console.log(req.body);

  //console.log("THIS IS TOKEN!!!!! "+req.body.sent_date)
  if(req.body!=null){
    //var resp = messageService.addMessage(req.body);
    var resp = addMessage(req.body);
    var notificationKey = getNotificationKey(req.body);
    Promise.all([resp,notificationKey]).then(function(data){
      console.log("notificationKey data!");
      var dataArr = data[1];
      console.log(dataArr[0].notification_key);
      var notificationKey = dataArr[0].notification_key;

      var payload = {
        data: {
          number: req.body.contact_number,
          text:  req.body.text,
          time_stamp: req.body.sent_date,
          sent_from: req.body.sent_from
        }
      };
      // Send a message to the device corresponding to the provided
      // registration token.
      admin.messaging().sendToDeviceGroup(notificationKey, payload)
      .then(function(response) {
        // See the MessagingDeviceGroupResponse reference documentation for
        // the contents of response.
        console.log("Successfully sent message:", response);
      })
      .catch(function(error) {
        console.log("Error sending message:", error);
      });

    }).catch(function(err) {
      console.log("Error in sql somewhere in getNotificationToken or !! ");
      console.log(err); // some coding error in handling happened
  });

  }

/*   var payload = {
    data: {
      number: req.body.contact_number,
      time:  req.body.text,
      time_stamp: req.body.sent_date,
      sent_from: req.body.sent_from
    }
  };
  
  // Send a message to the device corresponding to the provided
  // registration token.
  admin.messaging().sendToDeviceGroup(notificationKey, payload)
  .then(function(response) {
    // See the MessagingDeviceGroupResponse reference documentation for
    // the contents of response.
    console.log("Successfully sent message:", response);
  })
  .catch(function(error) {
    console.log("Error sending message:", error);
  }); */
  //res.send();
  Promise.all(resp).then(function(data){
    console.log(data);
    res.sendStatus(resp);
  });
  
});

async function getNotificationKey(body){
    var resp = await userService.getNotificationToken(req.body);
    return resp;
}

async function addMessage(body,ID){
  var resp = await messageService.addMessage(body);
  return resp;
}

app.listen(8080, function () {
  console.log('App listening on port 8080!')
})