'use strict';

angular.module('myApp.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {

}])

.controller('LoginCtrl', ['$rootScope', function($rootScope){
  
  // Check if the Facebook API is already initialized
  if (window.fbAsyncInit) {
    console.log('Already Initialized FB', window.FB);
    checkLoginState();
  } else {
    initFB();
  }
	
	function statusChangeCallback(response) {
    console.log('statusChangeCallback: ',response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      console.log('connected: ',response);

	      showLogoutButton();
	      getUser();
	      $rootScope.hosts = [];
	      init();
	      
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into Facebook.';
    }
  }

  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  function initFB() {
    window.fbAsyncInit = function() {
    FB.init({
      appId      : '1671835566415608',
      cookie     : true,  // enable cookies to allow the server to access 
                          // the session
      xfbml      : true,  // parse social plugins on this page
      version    : 'v2.5' // use graph api version 2.5
    });

    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
    };
  }

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  function getUser() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
      document.getElementById('status').innerHTML = response.name;
        $rootScope.user = response;
    });
  }

  function getEvents(hosts) {
    var ready = false;
    var hostCounter = 0;
    for (var i = 0; i < hosts.length; i++) {
      var hostId = hosts[i].id;
      /* make the API call */
      FB.api(
        "/"+hostId+"/events?fields=description,id,name,cover,start_time,end_time,owner",
        function (response) {
          if (response && !response.error) {
            /* handle the result */       
            var events = response.data;
            if (events && events.length > 0) {
              var hostName = events[0].owner.name;
              var hostId = events[0].owner.id;
              var host = {};
              host.events = events;
              host.name = hostName;
              host.id = hostId;
              $rootScope.hosts.push(host);
            }          
            hostCounter++;
            if (hostCounter == hosts.length) {
              ready = true;
            } 
          }
          else if (response.error) {
            console.log('Error: ',response.error.message);
          }
        }
      );
    }

    var intervalID = window.setInterval(checkIfReady, 100);
    var timer = 0;
    function checkIfReady() {
      if (timer < 150) {
        // console.log(ready);
        if (ready) {
          window.clearInterval(intervalID);
          window.location="#/events";
        }
        timer++;
      } else {
        console.log("timeout: couldn't load events");
        window.clearInterval(intervalID);
        window.location="#/events";
      }
    }
  }

  function loadJSON(callback) {   
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', './hosts.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
      if (xobj.readyState == 4 && xobj.status == "200") {
        callback(xobj.responseText);
      }
    };
    xobj.send(null);  
  }

  function init($scope) {
    loadJSON(function(response) {
      // Parse JSON string into object
      var hosts;
      hosts = JSON.parse(response);
      getEvents(hosts);
    });
  }  

  $rootScope.loginFB = function () {
    FB.login(function(response){
      console.log(response);
      checkLoginState();
    }); 
  }

  $rootScope.logoutFB = function () {
    console.log('Logout');
    FB.logout(function(response) {
      console.log('Logging out: ',response);
      showLoginButton();
      document.location = '#/';
    });
  }

  function showLogoutButton () {
    document.getElementById('loginBtn').style.display = "none";
    document.getElementById('logoutBtn').style.display = "inline-block";
  }

  function showLoginButton () {
    document.getElementById('logoutBtn').style.display = "none";
    document.getElementById('loginBtn').style.display = "inline-block";
  }

}]);
