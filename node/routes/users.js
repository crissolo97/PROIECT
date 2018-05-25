const express = require('express');
const router = express.Router();

let Utilizator = require('../models/utilizator');

router.get('/register', (req, res) =>{
  res.sendFile(path.join(__dirname + './public/Register.html'));

});

router.post('/register', function(req, res) {
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
      res.redirect('/');
    }

  });
});

module.exports = router;
