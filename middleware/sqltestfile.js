var gcm = require('node-gcm');
var request = require('ajax-request');
var admin = require("firebase-admin");
var io = require('socket.io').listen(7855);
var mysql = require('mysql');

var serviceAccount = require("./friendlyc-b831c-firebase-adminsdk-6zz68-90905c4fb7.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://friendlyc-b831c.firebaseio.com"
});

var con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: "root",
  password: "password",
  database: "crappybullet",
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
});


      
/*     console.log("findOrCreateUser();");
    con.query('select id from gcm_fcm_id where id=?',['skdfjsdfsdfsdfdfgsdfasdfasdflaksjdf'], function(err, result) {
      if (err){
        console.log(err);
      }else{
        console.log(result.length);
      } 
    }); 
 */

     // con.query('UPD ');

/*   var sender = new gcm.Sender('AAAABOqf6Ug:APA91bEXSrpBQ8rFaOHt_fLcMY7J8jHaIxEJDT4KOgFolZVE38NI_hWQyVb9z5z-knp-aiD36CzYkM3JqF6yNMa_D17UD4nKvAtV2uP8-WbgKbB5B4BmdSwrGadSzVz7INm0-6oWtXE3');
  var token = 'APA91bGm7NhtRlmHMm5eV-t1PNHjU9LvoPAOYDEpUfg2l0i5aCVhujxvJx-lDzwoaURyAmPw0gCFnvBFHKfZJPeAXYhKcgb89wbjFk5qPfxuqax_8c_PyheDyF2v6Quj_gHVCSPASkrn';

  // Prepare a message to be sent
  var message = new gcm.Message({
    data: { key1: 'msg1' }
  });

  // Specify which registration IDs to deliver the message to
  var regTokens = [token];

  // Actually send the message
  sender.send(message, { registrationTokens: regTokens }, function (err, response) {
    if (err) console.error(err);
    else console.log(response);
  });
 */

/*   var user1 = {"operation": "create",
  "notification_key_name": "appUser-Test",
  "registration_ids": ["APA91bGm7NhtRlmHMm5eV-t1PNHjU9LvoPAOYDEpUfg2l0i5aCVhujxvJx-lDzwoaURyAmPw0gCFnvBFHKfZJPeAXYhKcgb89wbjFk5qPfxuqax_8c_PyheDyF2v6Quj_gHVCSPASkrn","eIPwotHKK7I:APA91bGDGzSGxMVFllubiTSvYftD-s7YLvwJEHmSpio0BtY_FSm6CdiVf6FO6-RkG-evWZDXDHzerZcoTNSGjrEIOmV0w-nzBvtJgK9FMgMqDlafUnvZEgL0w-zyAVH03_FpiiHXVhZf"]};
  var url = "https://android.googleapis.com/gcm/notification";
          
  $.ajax({
      url: url,
      type: 'POST',
      ContentType: 'application/json',
      dataType: "json",
      crossDomain: true, 
      Authorization:key='AAAABOqf6Ug:APA91bEXSrpBQ8rFaOHt_fLcMY7J8jHaIxEJDT4KOgFolZVE38NI_hWQyVb9z5z-knp-aiD36CzYkM3JqF6yNMa_D17UD4nKvAtV2uP8-WbgKbB5B4BmdSwrGadSzVz7INm0-6oWtXE3',
      project_id:'21116217672',
      data: user1,          
      success: function(data) {
          console.log('success');
          console.log(JSON.stringify(data));
      }
  });
 */


function remove(){
  var user1 = {
    operation: "remove",
  notification_key_name: "drewsony1994@gmail.com3",
  notification_key: "APA91bE6Z0eWtQ1UXoofk_ZPTV9nl3jtB-FNi0pu0eTUeh-5i3X6RXHoSt0OhjpMSEl55r5dX5sj7FBhJ32jiBaYV9v37wLVo__WN5s9Pa29Hn7bL0tJ8Ao",
  registration_ids: ["dCkg7FvfnNQ:APA91bHnGMPcIrCLuDZiXThH5WpKje9m2ltGVjbI7MIg-wa0buOgTFwG-VlD1SWPct_4F4t9ElYK2aQ3lpaLsT5zqCD5sYyPnxsFo7rlCxc1ql_5rEa7Bfz4-SRHDIVv0zH-eQINpyDH"]};

  var header = {ContentType:"application/json",Authorization:"key=AIzaSyDapDGjhUAKvgqsl9pa2lDGnCAot3B3k90",project_id:"21116217672"}

  request.post({
    url: 'https://android.googleapis.com/gcm/notification',
    data: user1,
    headers: header
  },output
  );

  function output(error, response, body){
    console.log(body);
  } 
}

//remove();
function getNotificationToken(user) {
  console.log("getNotificationToken();");
  return new Promise(function(resolve, reject) {
    con.query('select id,notification_key from user where email=?',
    [user.email], function(err, result) {
      if (err) return reject(err);
      //if(result.length > 1) return reject(err);
      //console.log("result from getNotificationToken()");
      //console.log(result);
      return resolve(result);
    });
  });
}   


user = {email:'drewsony1994@gmail.com'}
//var test = await getNotificationToken(user);
/* Promise.all([test]).then(function(key){
  console.log(("I'm here!!!!"));
  console.log(key[0][0].id);

}); */
async function f1() {
  var x = await getNotificationToken(user);
  return x;
}

function f2(){
  console.log("calling f1()");
  var y = f1();
  console.log(y);
  console.log("f1() result");
}


f2();