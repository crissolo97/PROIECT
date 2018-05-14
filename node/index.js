var express = require('express');
var app = express();
var path = require('path');
//var engines = require('consolidate');

// init app


//app.use(express.static(__dirname + '/node/views'));

// view engine
//app.set('views', __dirname + '/views');
//app.engine('html', engines.mustache);
//app.set('view engine', 'html');

//set public folder for html files
app.use(express.static(path.join(__dirname, 'public')));

// home page MainScreen.html
app.get('/', function(req, res) {
  //res.sendFile(path.join(__dirname + '/MainScreen'));
  //res.render('MainScreen.html');
  res.sendFile(path.join(__dirname + '/public/MainScreen.html'));

});

// start server
app.listen(3000, function() {
  console.log('Server starts on localhost:3000');
});
