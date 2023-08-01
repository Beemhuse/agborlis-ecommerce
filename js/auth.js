//createNewProduct('Alejandro Hernandez', 'res/products/product09.jpg', 'Aluminium Cilinder', 'A cilinder made by aluminium', 'this box bla bla', 'furniture', 4, 3000);
//DOM


//panels
const loginPanel = document.getElementById('loginPanel');
const signUpPanel = document.getElementById('signUpPanel');

//inputs & submit buttons
  //login
  const emailL = document.getElementById('emailL');
  const passwordL = document.getElementById('passwordL');
  const submitL = document.getElementById('submitL');

  //btn access
  const linkSignUp = document.getElementById('linkSignUp');
  const linkLogin = document.getElementById('linkLogin');

  //error handler
  let errorHandlerL = document.getElementById('errorHandlerL');

  //sign up
  const emailS = document.getElementById('emailS');
  const passwordS = document.getElementById('passwordS');
  const cPasswordS = document.getElementById('cPasswordS');
  const submitS = document.getElementById('submitS');

  //btn access
  //const accessSignUp = document.getElementById('accessSignUp');

  //error error handler
  let errorHandlerS = document.getElementById('errorHandlerS');

  //Loading
  const loadingPanel = document.getElementById('loading-panel');

//user panels and btns
/*const user_info = document.getElementById('user_info');
const settings = document.getElementById('settings');
const logout = document.getElementById('logout');
const home = document.getElementById('home');*/

linkSignUp.addEventListener('click', e => {
  loginPanel.style = 'display:none';
  signUpPanel.style = 'display:block';
});

linkLogin.addEventListener('click', e => {
  loginPanel.style = 'display:block';
  signUpPanel.style = 'display:none';
});


//Log the user
submitL.addEventListener('click', e => {
  loadingPanel.style = 'display:block';

  let email = emailL.value;
  let password = passwordL.value;

  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;

  loadingPanel.style = 'display:none';

  errorHandlerL.innerHTML = errorMessage;
  // ...
});
});

//register the user
submitS.addEventListener('click', e => {
  loadingPanel.style  ='display:block';

  let email = emailS.value;
  let password = passwordS.value;

  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
 // Handle Errors here.
 var errorCode = error.code;
 var errorMessage = error.message;

 loadingPanel.style  ='display:none';

 errorHandlerS.innerHTML = errorMessage;
 // ...
});

});

function redirectBasedOnRole(uid) {
  console.log(uid)
  databaseRef.ref('users/' + uid).once('value')
    .then(function(snapshot) {
      const role = snapshot.val().role;
      if (role === "admin") {
        console.log(role)
        window.location.href = 'admin.html';
      } else {
        window.location.href = 'index.html';
      }
    })
    .catch(function(error) {
      console.error("Error checking user role:", error);
      // Redirect to a default page in case of an error or user role not found
      window.location.href = '../index.html';
    });
  }


//Listener for changes
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    loadingPanel.style  ='display:none';

    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    var providerData = user.providerData;

   //write the user in the database
   let check = 0;
   var uid = user.uid;
console.log(uid)
   // Check user's role and redirect accordingly
   firebase.database().ref('users/' + uid).on('value', snap => {
     check = 1;
   });

   if(check ==  0){
console.log(uid)
    writeNewUser(uid, displayName, email, photoURL, emailVerified, "user");

    //window.location.href ='index.html';
  }else {
   redirectBasedOnRole(uid);

    // window.location.href ='index.html';
  }

  


    //send email verification



    // ...
  } else {
    loadingPanel.style = 'display:none';
    // User is signed out.
    // ...
  }
});
