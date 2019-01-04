// angular.module("appRoutes", ["ngRoute"]).config(function() {
//   // this userApp is use in html page and use with any tag to tell us use this angular application
//   console.log("testing our routes "); // first argumant app name 2nd depenindiences
// });
angular
  .module("appRoutes", ["ngRoute"])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider
      .when("/", { templateUrl: "app/views/pages/home.html" })
      .when("/about", { templateUrl: "app/views/pages/about.html" })
      .when("/register", {
        templateUrl: "app/views/pages/users/register.html",
        controller: "regCtrl",
        controllerAs: "register"
      })
      .when("/register", {
        templateUrl: "app/views/pages/users/register.html",
        controller: "regCtrl",
        controllerAs: "register"
      })
      .when("/login", {
        templateUrl: "app/views/pages/users/login.html"
        // controller: "regCtrl",
        // controllerAs: "register"
        // see above we add register controller individual
        // we can't add controller there it's add in index.html file
        // becasue we want to this controller to maintain on all views
        // and becuase it's going to control our user being logged in
      })
      .when("/logout", {
        templateUrl: "app/views/pages/users/logout.html"
      })
      .when("/profile", {
        templateUrl: "app/views/pages/users/profile.html"
      })
      .otherwise({ redirectTo: "/" });
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  });
