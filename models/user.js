var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userSchema = Schema({
firstName: { type: String },
lastName:  { type: String },
login:     { type: Number},
articles:  { type: Object},
email:     { type: String, required: true},
password:  { type: String, required: true}

});


var User = mongoose.model("User", userSchema);

module.exports = User;
