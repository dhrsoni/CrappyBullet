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



  const messaging = firebase.messaging();
  this.database = firebase.database();


  this.submitButton = document.getElementById('submit');
  this.messageForm = document.getElementById('message-form');
  this.messageInput = document.getElementById('message');

  
  //messageForm.addEventListener('submit', saveMessage(),false);





function initApp() {
  // Listen for auth state changes.
  // [START authstatelistener]
  this.signInButton = document.getElementById('sign-in');
  this.signOutButton = document.getElementById('sign-out');




  signInButton.addEventListener('click', startSignIn);
  signOutButton.addEventListener('click', startSignout);
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      this.signInButton = document.getElementById('sign-in');
      this.signOutButton = document.getElementById('sign-out');
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;

/*         var myVar = localStorage['myKey'] || 'defaultValue';
        //console.log(token);
        if(myVar == "defaultValue"){
          localStorage['myKey'] = user.uid;
          var user1 = {display_name:displayName, email:email};
          var url = "http://localhost:8080/newUser";
                  
          $.ajax({
              url: url,
              type: 'POST',
              ContentType: 'application/json',
              dataType: "json",
              crossDomain: true, 
              data: user1,          
              success: function(data) {
                  console.log('success');
                  console.log(JSON.stringify(data));
              }
          });
        } */

    this.signOutButton.removeAttribute('hidden');
    // Hide sign-in button.
    this.signInButton.setAttribute('hidden', 'true');
    $( "#main_paig" ).show();
    $("#login_page").hide();
    $( "#header" ).show();
    $('body').css("background-color","#ffffff");


    // fireDB();
    var myVar = localStorage['registered'] || 'defaultValue';
    if(myVar == "defaultValue"){
      localStorage['registered'] =true;
      register(user);
    }
/*       chrome.storage.local.get("registered", function(result) {
        // If already registered, bail out.
        if (result["registered"]){
          console.log("found")
          return;
        }
        // Up to 100 senders are allowed.
        register(user);
      }); */
    // [END_EXCLUDE]
    } else {
      // Let's try to get a Google auth token programmatically.
      // [START_EXCLUDE]
    this.signOutButton.setAttribute('hidden', 'true');
    this.signInButton.removeAttribute('hidden');
    $( "#main_paig" ).hide();
    $("#login_page").show();
    $( "#header" ).hide();
    $('body').css("background-color","#061A5F");
      // [END_EXCLUDE]
    }
    //document.getElementById('quickstart-button').disabled = false;
  });
}

function register(user) {
  console.log("register()");
  var senderId = "21116217672";
  chrome.gcm.register([senderId],function registerCallback(registerCallback){
    if (chrome.runtime.lastError) {
      // When the registration fails, handle the error and retry the
      // registration later.
      return;
    }
    console.log(registerCallback);
    var user1 = {display_name:user.displayName, email:user.email,fcmID:registerCallback};
    var url = "http://localhost:8080/newUser";
            
    $.ajax({
        url: url,
        type: 'POST',
        ContentType: 'application/json',
        dataType: "json",
        crossDomain: true, 
        data: user1,          
    }).done(function() {
      console.log("DONE!!");
      console.log('success');
      chrome.storage.local.set({registered: true});
    }).fail(function() {
      console.log( "error" );
      startSignout();
    });

  });

  // Prevent register button from being click again before the registration
  // finishes.
}

function registerCallback(registrationId) {

  user
  //console.log(registrationId);
  // Send the registration token to your application server.
  sendRegistrationId(function(succeed) {
    // Once the registration token is received by your server,
    // set the flag such that register will not be invoked
    // next time when the app starts up.
    if (succeed)
      chrome.storage.local.set({registered: true});
  },registrationId);
}

function sendRegistrationId(callback,registrationId) {
  // Send the registration token to your application server
  // in a secure way.
  console.log(registrationId);
}

messaging.onMessage(function(payload) {
  console.log("Message received. ", payload);
  // ...
});

function fireDB(){

    // Reference to the /messages/ database path.
  this.messagesRef = this.database.ref('TestUser');
  // Make sure we remove all previous listeners.
  this.messagesRef.off();

  // Loads the last 12 messages and listen for new ones.
  var setMessage = function(data) {
    var val = data.val();
    this.displayMessage(data.key, val.number, val.body, val.photoUrl, val.imageUrl);
  }.bind(this);
  this.messagesRef.limitToLast(12).on('child_added', setMessage);
  this.messagesRef.limitToLast(12).on('child_changed', setMessage);


}

 var MESSAGE_TEMPLATE =
    '<div class="message-container">' +
      '<div class="spacing"><div class="pic"></div></div>' +
      '<div class="message"></div>' +
      '<div class="name"></div>' +
    '</div>';

    var LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif';

  function displayMessage (key, number, body, picUrl, imageUri) {
  //console.log(key);
  this.messageList = document.getElementById('messages');
  var div = document.getElementById(key);
  // If an element for that message does not exists yet we create it.
  if (!div) {
    var container = document.createElement('div');
    container.innerHTML =  MESSAGE_TEMPLATE;
    div = container.firstChild;
    div.setAttribute('id', key);
    this.messageList.appendChild(div);
  }
  if (picUrl) {
    div.querySelector('.pic').style.backgroundImage = 'url(' + picUrl + ')';
  }
  div.querySelector('.name').textContent = number;
  var messageElement = div.querySelector('.message');
  if (body) { // If the message is text.
    messageElement.textContent = body;
    // Replace all line breaks by <br>.
    messageElement.innerHTML = messageElement.innerHTML.replace(/\n/g, '<br>');
  } else if (imageUri) { // If the message is an image.
    var image = document.createElement('img');
    image.addEventListener('load', function() {
      this.messageList.scrollTop = this.messageList.scrollHeight;
    }.bind(this));
    this.setImageUrl(imageUri, image);
    messageElement.innerHTML = '';
    messageElement.appendChild(image);
  }
  // Show the card fading-in and scroll to view the new message.
  setTimeout(function() {div.classList.add('visible')}, 1);
  this.messageList.scrollTop = this.messageList.scrollHeight;
  //this.messageInput.focus();
};

function startAuth(interactive) {
  // Request an OAuth token from the Chrome Identity API.
  chrome.identity.getAuthToken({interactive: !!interactive}, function(token) {
    if (chrome.runtime.lastError && !interactive) {
      console.log('It was not possible to get a token programmatically.');
    } else if(chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError);
    } else if (token) {
      // Authrorize Firebase with the OAuth Access Token.
      var credential = firebase.auth.GoogleAuthProvider.credential(null, token);
      firebase.auth().signInWithCredential(credential).catch(function(error) {
        // The OAuth token might have been invalidated. Lets' remove it from cache.
        if (error.code === 'auth/invalid-credential') {
          chrome.identity.removeCachedAuthToken({token: token}, function() {
            startAuth(interactive);
          });
        }
      });
    } else {
      console.error('The OAuth Token was null');
    }
  });
}

/**
 * Starts the sign-in process.
 */
function startSignIn() {
    startAuth(true);
   //signIn();
}

function startSignout(){
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    console.log("Sign-out successful");
  }).catch(function(error) {
    // An error happened.
    console.log("Error singingout");
  })

  $( "#main_paig" ).hide();
  $("#login_page").show();
  $( "#header" ).hide();

}

window.onload = function() {
  initApp();
};


function initFirebase() {
  // Shortcuts to Firebase SDK features.
  this.auth = firebase.auth();
  this.database = firebase.database();
  this.storage = firebase.storage();
  token = firebase.messaging.getToken();
  console.log("token");
  console.log(token);
};




function checkSignedInWithMessage(){
  // Return true if the user is signed in Firebase
  if (this.auth.currentUser) {
    return true;
  }

  // Display a message to the user using a Toast.
  var data = {
    message: 'You must sign-in first',
    timeout: 2000
  };
  this.signInSnackbar.MaterialSnackbar.showSnackbar(data);
  return false;
};

$(function(){
    $('#submit').click(function() {
      this.auth = firebase.auth();
      this.database = firebase.database();
      this.messagesRef = this.database.ref('TestUser');
  // Make sure we remove all previous listeners.
      this.messagesRef.off();
      console.log("from saveMessages!!!")



      //e.preventDefault();
      // Check that the user entered a message and is signed in.
      console.log($('#message').val());
      if ($('#message').val() && this.auth.currentUser && $('#number').val() ) {
        if($('#number').val().length  != 10){

          $('#number').css("color","red");
          return;
        }
        console.log("Inside the if!");;
        var currentUser = this.auth.currentUser;
        // Add a new message entry to the Firebase Database.
        var finalNumber = $('#number').val();
        if(!$('#number').val().includes("+1")){
          finalNumber = "+1"+$('#number').val();
        }
        this.messagesRef.push({ 
          number: finalNumber,
          body: $('#message').val() ,
          photoUrl: currentUser.photoURL || '/images/profile_placeholder.png',
          devideID: "Chrome_client"
        }).then(function() {
          // Clear message text field and SEND button state.
          //FriendlyChat.resetMaterialTextfield(this.messageInput);
          fireDB();
          $('#message').val('');
          $('#number').val('')
          //this.toggleButton();
        }.bind(this)).catch(function(error) {
          console.error('Error writing new message to Firebase Database', error);
        });
      } 
    });
});


      
function signIn(){
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
}).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
      // ...
});
}
