var express = require('express'),
    PORT    = process.env.PORT || 5432,
    server  = express(),
    MONGOURI= process.env.MONGOLAB_URI || "mongodb://localhost:27017",
    DBNAME  = 'project2'
    mongoose= require('mongoose');

console.log("mongouri is", MONGOURI);

server.get('/test', function (req, res){
  res.write("Welcome to my app");
  res.end();
});

mongoose.connect(MONGOURI + "/" + DBNAME);
server.listen(PORT, function (){
  console.log("Hey listening on PORT: ", PORT);
});

// var express = require('express'),
//   PORT = process.env.PORT || 6667,
//   server = express(),
//   MONGOURI = process.env.MONGOLAB_URI || "mongodb://localhost:27017",
//   dbname = "project_two_db"
//   mongoose = require('mongoose');
//   server.get('/test', function(req, res){
//     res.write("fuck off");
//     res.end();
//   });
// mongoose.connect(MONGOURI + "/" + dbname)
//   server.listen(PORT,function(){
//     console.log("SERVER IS UP ON PORT:", PORT);
//   })
