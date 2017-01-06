module.exports = function(con) {

  return {
    addMessage: addMessage,
  }

  /*
   * @param {Object} message
   * @param {String} message.text
   * @param {String} message.uid
   * @param {String} message.contact_number
   * @param {Boolean} message.is_incoming - is the message being sent to the client
   * @param {Integer} message.sent_date - seconds since unix epoch
   * @return {Integer} insert id
   */
  function addMessage(message) {
    return new Promise(function(resolve, reject) {
      con.query('INSERT INTO message (text, uid, contact_number, is_incoming, sent_date) VALUES (?, ?, ?, ?, FROM_UNIXTIME(?))',
        [message.text, message.uid, message.contact_number, message.is_incoming, message.sent_date], function(err, result) {
        if (err) return reject(err);

        return resolve(result.insertId);
      });
    });
  }
}

