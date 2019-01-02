var express = require("express");
var app = express();
var port = process.env.PORT || 8080;
var morgan = require("morgan");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var router = express.Router();
var appRoute = require("./app/routes/api")(router);
var path = require("path");
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public")); // use this line for static file location
app.use("/api", appRoute);
mongoose.connect(
  "mongodb://localhost:27017/myweb",
  { useNewUrlParser: true },
  function(err) {
    if (err) {
      console.log("Not connected to MongoDB " + err);
    } else {
      console.log("successfully connected to MongoDB");
    }
  }
);
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname + "/public/app/views/index.html"));
});

app.listen(port, function() {
  console.log("server Running " + port);
});
