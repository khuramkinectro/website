// angular.module("appRoutes", ["ngRoute"]).config(function() {
//   // this userApp is use in html page and use with any tag to tell us use this angular application
//   console.log("testing our routes "); // first argumant app name 2nd depenindiences
// });
angular
  .module("appRoutes", ["ngRoute"])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "app/views/pages/home.html"
      })
      .when("/about", {
        templateUrl: "app/views/pages/about.html"
      })
      .when("/register", {
        templateUrl: "app/views/pages/users/register.html",
        controller: "regCtrl",
        controllerAs: "register"
      })
      .otherwise({ redirectTo: "/" });
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  });
