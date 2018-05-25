var express = require('express');
var app = express();
var path = require('path');
var body = require('body-parser');
var mongoose = require('mongoose');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var config = require('./config/database');
var passport = require('passport');
var router = express.Router();
var bcrypt = require('bcryptjs');

mongoose.connect(config.database);
let db = mongoose.connection;

// check connection db
db.once('open', function(){
  console.log('Connected to mongodb');
});

// check for db errors
db.on('error', function(error){
  console.log(err);
});

// bring in models
let Utilizator = require('./models/utilizator');
//let Log = require('./models/logare');

//set public folder for html files
app.use(express.static(path.join(__dirname, 'public')));

// express session middleware
app.use(session({
  secret : 'cat',
  resave : false,
  saveUninitialized : true,
  cookie : {secure : true}
}));

// express messages middleware
app.use(require('connect-flash')());
app.use(function(req, res, next){
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// express validator middleware
app.use(expressValidator({
  errorFormatter : function(param, msg, value){
      var namespace = param.split('.')
      , root = namespace.shift()
      , formParam = root;
    while(namespace.length){
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg : msg,
      value : value
    };
  }
}));

// passport config
require('./config/passport')(passport);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// home page MainScreen.html
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/MainScreen.html'));
});

// body parser middleware
app.use(body.urlencoded( {extended : false}));
app.use(body.json());

// add route
app.get('/register', (req, res) =>{
  res.sendFile(path.join(__dirname + '/public/Register.html'));

});

app.post('/register', function(req, res) {
  // utilizator collection
  let utilizator = new Utilizator();
  utilizator.nume = req.body.FirstName;
  utilizator.prenume = req.body.LastName;
  utilizator.email = req.body.Email;
  utilizator.cnp = req.body.CNP;
  utilizator.oras = req.body.City;
  utilizator.adresa = req.body.Adress;
  utilizator.parola = req.body.Password;
  utilizator.telefon = req.body.Telephone;

  utilizator.save(function(err){
    if(err){
      console.log(err);
      return;
    } else {
      res.redirect('/LogIn.html');
    }

  });
});

// app.post('./register', function(req, res){
//   // logare collection
//   let logare = new Log();
//   logare.email = req.body.Email;
//   logare.parola = req.body.Password;
//
//   logare.save(function(err){
//     if(err){
//       console.log(err);
//       return;
//     } else {
//       res.redirect('/');
//     }
//   });
// });

// // Load edit Form
// app.get('/register/edit/:id', function(req, res){
//   Utilizator.findById(req.params.id, function(req, res){
//     res.render('edit_article', {
//       utilizator:utilizator
//     });
//   });
// });

// // Update Submit Post route
// app.post('/register/edit/:id', function(req, res) {
//   // utilizator collection
//   let utilizator = {};
//   utilizator.nume = req.body.FirstName;
//   utilizator.prenume = req.body.LastName;
//   utilizator.email = req.body.Email;
//   utilizator.cnp = req.body.CNP;
//   utilizator.oras = req.body.City;
//   utilizator.adresa = req.body.Adress;
//   utilizator.parola = req.body.Password;
//   utilizator.telefon = req.body.Telephone;
//
//   let query = {_id : requ.params.id}
//
//   Utilizator.update(query, utilizator, function(err){
//     if(err){
//       console.log(err);
//       return;
//     } else {
//       res.redirect('/LogIn.html');
//     }
//
//   });
// });

// // delete request
// app.delete('/register/:id', function(req, res){
//   let query = {_id : req.params.id}
//   Utilizator.remove(query, function(err){
//     if(err){
//       console.log(err);
//     }
//     res.send('Succes');
//   });
// });
//

// log in form
app.get('/login', function(req, res){
  //res.render('login');
  res.sendFile(path.join(__dirname + '/public/LogIn.html'));
});
// log in process
app.post('/login', function(req, res, next){
  passport.authenticate('local', {
    succesRedirect: '/',
    failureRedirect: '/register',
    failureFlash: true
  })(req, res, next);
});

// routes
//let users = require('./routes/users');
//app.use('/users', users);

// // start server
app.listen(3000, function() {
  console.log('Server starts on localhost:3000');
});
