angular
  .module("userControllers", ["userServices"])
  .controller("regCtrl", function($http, $location, User) {
    var app = this;
    this.regUser = function(regData) {
      app.loading = true;
      app.errorMsg = false;
      //console.log("testing");
      //console.log(this.regData);
      // $http.post("/api/users", this.regData).then(function(data) { reply this line to bleow
      User.create(app.regData).then(function(data) {
        // user.create is a custom method we use rather then having http request
        //console.log(data.data.success);
        //console.log(data.data.message);
        if (data.data.success) {
          app.loading = false;
          app.successMsg = data.data.message;
          //redirect to homepage
          $location.path("/");
        } else {
          app.errorMsg = data.data.message;
          app.loading = false;
        }
      });
    };
  });
