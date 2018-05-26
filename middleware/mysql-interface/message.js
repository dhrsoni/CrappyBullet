module.exports = function(con) {

  return {
    addMessage: addMessage,
    getMessagesBeforeDateFromNumber: getMessagesBeforeDateFromNumber,
    getMostRecentMessageFromContacts: getMostRecentMessageFromContacts,
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
  function addMessage(message,ID) {
    console.log("addMessage()");
    console.log(addMessage);
    return new Promise(function(resolve, reject) {
      con.query('INSERT INTO message (msg, email,contact_number, is_incoming,sent_date,User_ID) VALUES (?, ?, ?, ?)',
        [message.text, message.email, message.contact_number, message.is_incoming,message.sent_date,ID], function(err, result) {
        if (err) return reject(err);

        return resolve(result.insertId);
      });
    });
  }
//email, msg, contact_number, is_incoming, sent_date, User_ID
  /*
   * @param {Object} input
   * @param {Integer} input.quantity
   * @param {String} input.uid
   * @param {[String]} input.contact_number
   * @param {String} input.before_date
   * @return {id: Integer, text: String, uid: String, is_incoming: Boolean, sent_date: UNIX_TIMESTAMP}
   */
  function getMessagesBeforeDateFromNumber(input) {
    return new Promise(function(resolve, reject) {
      con.query('SELECT id, text, uid, is_incoming, UNIX_TIMESTAMP(sent_date) AS sent_date FROM message ' +
        'WHERE sent_date < FROM_UNIXTIME(?) AND uid = ? AND contact_number = ? ORDER BY sent_date DESC, id DESC LIMIT ?',
        [input.before_date, input.uid, input.contact_number, input.quantity], function(err, result) {
        if (err) return reject(err);

        return resolve(result);
      });
    });
  }

  /*
   * @param {Object} input
   * @param {String} input.uid
   * @return {id: Integer, text: String, uid: String, is_incoming: Boolean, contact_number: String, sent_date: UNIX_TIMESTAMP}
   */
  function getMostRecentMessageFromContacts(input) {
    return new Promise(function(resolve, reject) {
      con.query('SELECT m.id, m.text, m.uid, m.is_incoming, m.contact_number, UNIX_TIMESTAMP(m.sent_date) AS sent_date FROM message m ' +
        'INNER JOIN (SELECT contact_number, MAX(sent_date) AS sdate FROM message WHERE uid = ? GROUP BY contact_number) tmp ' +
        'ON m.contact_number = tmp.co ntact_number AND m.sent_date = tmp.sdate',
        [input.uid], function(err, result) {
        if (err) return reject(err);

        return resolve(result);
      });
    });
  }
}

