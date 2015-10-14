var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// article is the datatype the object that follows it is the configuration schema
//object id and populate or embed author object
var Article = mongoose.model ('article', {
    author:         Object,
    title:          String,
    content:        String,
    lastEdit:       Date,
    lastEditAuthor: Object
});

var Article = mongoose.model("Article", articleSchema);

module.exports = Article;
