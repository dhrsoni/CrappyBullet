module.exports = function(con) {

  return {
    findOrCreateUser: findOrCreateUser,
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
  function findOrCreateUser(user) {
    return new Promise(function(resolve, reject) {
      con.query('INSERT INTO user (display_name, email, uid) SELECT * FROM (SELECT ?, ?, ?) AS tmp ' +
                'WHERE NOT EXISTS (SELECT uid FROM user WHERE uid = ?) LIMIT 1;',
        [user.display_name, user.email, user.uid, user.uid], function(err, result) {
        if (err) return reject(err);

        return resolve(result.affectedRows >= 1 ? true : false);
      });
    });
  }
}

