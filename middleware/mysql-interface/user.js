module.exports = function(con) {

  return {
    findOrCreateUser: findOrCreateUser,
    insertFcmToken : insertFcmToken,
    getNotificationToken : getNotificationToken,
    checkTokenEntry : checkTokenEntry,
    checkUserEntry : checkUserEntry,
  }

  /*
   * @param {Object} user
   * @param {String} user.display_name
   * @param {String} user.email
   * @param {String} user.uid
   * @return {Boolean} true if user was added to the user table
   *                   false if user already existed
   *                   error if problem
   */
  function findOrCreateUser(user,notification_key) {
    console.log("findOrCreateUser();");
    return new Promise(function(resolve, reject) {
      con.query('INSERT INTO user (email,display_name,notification_key) VALUES (?, ?, ?);insert into gcm_fcm_id (email,id) value (?,?);',
      [user.email,user.display_name,notification_key,user.email,user.fcmID], function(err, result) {
        if (err) return reject(err);
        return resolve(result);
      });
    });
  }

  function getNotificationToken(user) {
    console.log("getNotificationToken();");
    return new Promise(function(resolve, reject) {
      con.query('select notification_key from user where email=?',
      [user.email], function(err, result) {
        if (err) return reject(err);
        //if(result.length > 1) return reject(err);
        console.log("result from getNotificationToken()");
        console.log(result);
        return resolve(result);
      });
    });
  }

  


  function insertFcmToken(user) {
    console.log("findOinsertFcmTokenrCreateUser();");
    return new Promise(function(resolve, reject) {
      con.query('insert into gcm_fcm_id (email,id) value (?,?);' ,
      [user.email,user.fcmID], function(err, result) {
        if (err) return reject(err);
        return resolve(result);
      });
    });
  }


  function checkTokenEntry(request) {
    console.log("checkTokenEntry()");
    return new Promise(function(resolve, reject) {
      con.query('select id from gcm_fcm_id where id=?',[request], function(err, result) {
        if (err) return reject(err);
        console.log("result from checkTokenEntry ");
        console.log(result)
        return resolve(result.length);
      });
    });
  }

  function checkUserEntry(request) {
    console.log("checkUserEntry()");
    return new Promise(function(resolve, reject) {
      con.query('select email from user where email=?',[request], function(err, result) {
        if (err) return reject(err);
        return resolve(result.length);
      });
    });
  }



}