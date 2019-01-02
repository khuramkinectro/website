var User = require("../models/user");
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
  return router;
};
