var express = require("express");
var app = express();
var port = process.env.PORT || 8080;
var morgan = require("morgan");
var mongoose = require("mongoose");
var User = require("./app/models/user");
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
mongoose.connect(
  "mongodb://localhost:27017/myweb",
  function(err) {
    if (err) {
      console.log("Not connected to MongoDB " + err);
    } else {
      console.log("successfully connected to MongoDB");
    }
  }
);
app.post("/users", function(req, res) {
  var user = new User();
  user.username = req.body.username;
  user.password = req.body.password;
  user.email = req.body.email;
  user.save();
  res.send("User Created");
});
// app.get("/home", function(req, res) {
//   res.send("Home");
// });
///1
app.listen(port, function() {
  console.log("server Running " + port);
});
