var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt-nodejs");
var UserSchema = new Schema({
  username: { type: String, lowercase: true, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, lowercase: true, required: true, unique: true }
});

//middleware hey before saveing the schema u must " encrypt bcrypt the password "
UserSchema.pre("save", function(next) {
  var user = this; // user password running throught middleware
  bcrypt.hash(user.password, null, null, function(err, hash) {
    if (err) return next(err);
    console.log(user.password);
    // now store has in you data base
    user.password = hash; // asign hash to userpassword
    console.log(hash);
    next();
  });
});
UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};
module.exports = mongoose.model("User", UserSchema);
