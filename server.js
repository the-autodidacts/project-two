var express = require('express'),
    PORT    = process.env.PORT || 5432,
    server  = express(),
    MONGOURI= process.env.MONGOLAB_URI || "mongodb://localhost:27017",
    dbname  = 'project2'
    mongoose= require('mongoose');


server.get('/test', function (req, res){
  res.write("Welcome to my app");
  res.end();
});

mongoose.connect(MONGOURI+ dbname);
server.listen(PORT, function (){
  console.log("Hey");
});
