angular
  .module("mainController", ["authServices"]) //authServices comes form authServices.js
  // add these controller to app.js file
  .controller("mainCtrl", function(Auth, $location, $rootScope) {
    //Auth form authServices
    //app.loadme = false; // hide the html till loadme got true and
    //this loadme variable in index.html with body tag
    var app = this;
    $rootScope.$on("$routeChangeStart", function() {
      if (Auth.isLoggedIn()) {
        console.log("Success .. User LoggedIn Through Token");
        app.isLoggedIn = true;
        Auth.getUser().then(function(data) {
          console.log(data.data.username);
          app.username = data.data.username;
          app.useremail = data.data.email;
          // app.loadme = true; // for load applicition quick
        });
      } else {
        app.isLoggedIn = false;
        app.username = "";
        //app.loadme = true; // for load applicition quick

        console.log("Faliure... User Not LoggedIn");
      }
    });

    this.doLogin = function(loginData) {
      app.loading = true;
      app.errorMsg = false;
      Auth.login(app.loginData).then(function(data) {
        if (data.data.success) {
          app.loading = false;
          app.successMsg = data.data.message;
          $location.path("/about");
          app.loginData = "";
          app.successMsg = false;
        } else {
          app.errorMsg = data.data.message;
          app.loading = false;
        }
      });
    };
    this.logout = function() {
      Auth.logout();
      $location.path("/");
    };
  });
