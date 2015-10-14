var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userSchema = Schema({
firstName: { type: String, required: true},
lastName:  { type: String, required: true },
email:     { type: String, required: true},
password:  { type: String, required: true}

});


var User = mongoose.model("User", userSchema);

module.exports = User;
