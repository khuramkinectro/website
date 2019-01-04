//simple flow when page refresh we  go to localstorage with get token and go to
// authFactory.isLoggedIn = function() { and see user login or not ...
//if return ture then he go to mainCtrl page and say yes the user LoggedIn

angular
  .module("authServices", [])
  // .factory("Auth", function($http) { // AuthToken pass as argument for below code reference
  .factory("Auth", function($http, AuthToken) {
    authFactory = {};
    //   Auth.create(loginData)
    authFactory.login = function(loginData) {
      // return $http.post("/api/authenticate", loginData);
      // add .then function with above line for getting Token
      return $http.post("/api/authenticate", loginData).then(function(data) {
        // console.log(data); // in data we have token and many otherthing
        console.log(data.data.token); // got exact token
        // for set this in browser call AuthToken.setToken
        AuthToken.setToken(data.data.token);
        return data;
      });
    };
    //Auth.isLoggedIn();
    authFactory.isLoggedIn = function() {
      if (AuthToken.getToken()) {
        return true; // user LoggedIn
      } else {
        return false; // User no LoggedIn
      }
    };
    //Auth.getUser();
    authFactory.getUser = function() {
      if (AuthToken.getToken()) {
        return $http.post("/api/me");
      } else {
        $q.reject({ message: "User has no token" });
      }
    };
    //Auth.logout();
    authFactory.logout = function() {
      AuthToken.setToken();
    };
    return authFactory;
  })
  .factory("AuthToken", function($window) {
    var authTokenFactory = {};
    //AuthToken.setToken(token); // Invoke fun (setToken) this will sav token in localstorage
    //setToken is  custom function for setting token
    // authTokenFactory.setToken = function(token) {
    //   $window.localStorage.setItem("token", token); //angular
    // };
    authTokenFactory.setToken = function(token) {
      if (token) {
        $window.localStorage.setItem("token", token); //angular
      } else {
        $window.localStorage.removeItem("token"); //in setTokenfun we add new things
        //if token passIn or true then go ...and setit
      }
    };
    //this fun geting data form local storage we can do whatever..we check with this Token User LoggedIn or not
    authTokenFactory.getToken = function() {
      return $window.localStorage.getItem("token"); //angular
    };
    return authTokenFactory;
  })
  .factory("AuthInterceptors", function(AuthToken) {
    var authInterceptorsFactory = {};

    authInterceptorsFactory.request = function(config) {
      var token = AuthToken.getToken();
      if (token) config.headers["x-access-token"] = token;
      return config;
    };
    return authInterceptorsFactory;
  });
