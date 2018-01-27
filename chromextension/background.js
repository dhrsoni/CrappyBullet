// TODO(DEVELOPER): Change the values below using values from the initialization snippet: Firebase Console > Overview > Add Firebase to your web app.
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyB2NZmEHaeV4JvuTyMJCd2aYxQv-JTHmJg",
    authDomain: "friendlyc-b831c.firebaseapp.com",
    databaseURL: "https://friendlyc-b831c.firebaseio.com",
    storageBucket: "friendlyc-b831c.appspot.com",
    messagingSenderId: "21116217672"
  };
  firebase.initializeApp(config);   


/**
 * initApp handles setting up the Firebase context and registering
 * callbacks for the auth status.
 *
 * The core initialization is in firebase.App - this is the glue class
 * which stores configuration. We provide an app name here to allow
 * distinguishing multiple app instances.
 *
 * This method also registers a listener with firebase.auth().onAuthStateChanged.
 * This listener is called when the user is signed in or out, and that
 * is where we update the UI.
 *
 * When signed in, we also authenticate to the Firebase Realtime Database.
 */

function initApp() {
  // Listen for auth state changes. vxc
  //chrome.gcm.onMessage.addListener(messageReceived);
  firebase.auth().onAuthStateChanged(function(user) {
    console.log('User state change detected from the Background script of the Chrome Extension:', user);
  }); 



}


function firstTimeRegistration() {
/*   chrome.storage.local.get("registered", function(result) {
    // If already registered, bail out.
    if (result["registered"])
      return;

    registerWindowCreated = true;
    chrome.app.window.create(
      "register.html",
      {  width: 500,
         height: 400,
         frame: 'chrome'
      },
      function(appWin) {}
    );
  }); */
}

chrome.gcm.onMessage.addListener(function(messageReceived){
  console.log("got message@!!!!");
  console.log(messageReceived);
  chrome.notifications.create('Crappy bullet', {
    type: 'basic',
    iconUrl: 'firebase-logo.png',
    title: "val.number",
    message: "val.body"
  }, function(notificationId) {})

});



/*  var ref = firebase.database().ref('TestUser');
  ref.on('child_added', setMessage);
  function setMessage(data) {
  var val = data.val();
  if(val.devideID != 'Chrome_client'){
      chrome.notifications.create('Crappy bullet', {
        type: 'basic',
        iconUrl: 'firebase-logo.png',
        title: val.number,
        message: val.body
    }, function(notificationId) {});
  }


}*/


window.onload = function() {
  initApp();
};
