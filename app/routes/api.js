var User = require("../models/user");
var jwt = require("jsonwebtoken");
var secret = "harrypotter";
// for external file we a module.exports
module.exports = function(router) {
  router.post("/users", function(req, res) {
    var user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    user.email = req.body.email;
    if (
      req.body.username == null ||
      req.body.username == "" ||
      req.body.email == null ||
      req.body.email == "" ||
      req.body.password == null ||
      req.body.password == ""
    ) {
      res.json({
        success: false,
        message: "Please Ensure that username , email and password is provided"
      });
    } else {
      user.save(function(err) {
        if (err) {
          res.json({
            success: false,
            message: "username or Email alreay exists !"
          });
        } else {
          res.json({ success: true, message: "User Created !" });
        }
      });
    }
  });
  router.post("/authenticate", function(req, res) {
    //res.send("testing authenticate route login");
    User.findOne({ username: req.body.username })
      .select("email username password")
      .exec(function(err, user) {
        if (err) throw err;
        if (!user) {
          res.json({
            success: false,
            message: "Could not authentocation user"
          });
        } else if (user) {
          if (req.body.password) {
            var validPassword = user.comparePassword(req.body.password);
          } else {
            res.json({
              success: false,
              message: "No password Provided"
            });
          }
        }
        if (!validPassword) {
          res.json({
            success: false,
            message: "Could not authenicate password"
          });
        } else {
          var token = jwt.sign(
            { username: user.username, email: user.email },
            secret,
            { expiresIn: "24h" }
          );
          //Generate a token 1st paramater is data 2nd parameter for extra security,3rd time
          res.json({
            success: true,
            message: "User authenticat !",
            token: token
          });
        }
      });
  });
  // we need a send token as decypted for that we need a middleware
  //middleware for
  router.use(function(req, res, next) {
    // we get token through 3 way;1 form body 2 form url 3 form header
    var token =
      req.body.token || req.body.query || req.headers["x-access-token"];
    if (token) {
      // token verify
      jwt.verify(token, secret, function(err, decoded) {
        if (err) {
          res.json({ success: false, message: "Token invalid" });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      res.json({ success: false, message: "No token Found" });
    }
  });
  router.post("/me", function(req, res) {
    // res.send("testing me route");
    res.send(req.decoded); // show login data in the form of data
  });
  return router;
};
