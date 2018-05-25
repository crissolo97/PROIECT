const LocalStrategy = require('passport-local').Strategy;
const Utilizator = require('../models/utilizator');
const config = require('../config/database');
const bcrypt = require('bcryptjs');

module.exports = function(passport){
  // local Strategy
  passport.use(new LocalStrategy(function(Email, Password, done){
    //match username
    let query = {Email:email};
    Utilizator.findOne(query, function(err, user){
      if(err) throw err;
      if(!user){
        return done(null, false, {message: 'No email found'});
      }

      // match Password
      bcrypt.compare(Password, user.parola, function(err, isMatch){
        if(err) throw err;
        if(isMatch){
          return done(null, user);
        } else {
          return done(null, false, {message: 'Wrong password'});
        }
      });
    });
  }));

  passport.serializeUser(function(user, done){
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done){
    Utilizator.findById(id, function(err, user){
      done(err, user);
    });
  });
}
