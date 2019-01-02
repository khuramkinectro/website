angular.module("userControllers", []).controller("regCtrl", function($http) {
  var app = this;
  this.regUser = function(regData) {
    app.loading = true;
    app.errorMsg = false;
    //console.log("testing");
    //console.log(this.regData);
    $http.post("/api/users", this.regData).then(function(data) {
      //console.log(data.data.success);
      //console.log(data.data.message);
      if (data.data.success) {
        app.loading = false;
        app.successMsg = data.data.message;
      } else {
        app.errorMsg = data.data.message;
        app.loading = false;
      }
    });
  };
});
