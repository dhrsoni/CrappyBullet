importScripts('https://www.gstatic.com/firebasejs/4.1.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.1.1/firebase-messaging.js');
importScripts('https://www.gstatic.com/firebasejs/4.1.1/firebase.js');


var config = {
    apiKey: "AIzaSyB2NZmEHaeV4JvuTyMJCd2aYxQv-JTHmJg",
    authDomain: "friendlyc-b831c.firebaseapp.com",
    databaseURL: "https://friendlyc-b831c.firebaseio.com",
    storageBucket: "friendlyc-b831c.appspot.com",
    messagingSenderId: "21116217672"
  };
firebase.initializeApp(config);
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    alert('Background Message Title');
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
        body: 'Background Message body.',
        icon: '/firebase-logo.png'
    };

    chrome.notifications.create('Crappy bullet', {
        type: 'basic',
        iconUrl: 'firebase-logo.png',
        title: val.number,
        message: val.body
    }, function(notificationId) {});

return self.registration.showNotification(notificationTitle,
    notificationOptions);
});