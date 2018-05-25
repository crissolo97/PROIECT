const mongoose = require('mongoose');
// utilizator schema
const utilizatorSchema = mongoose.Schema({
  nume:{
    type: String,
    required: true
  },
  prenume:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  cnp:{
    type: Number,
    required: true
  },
  oras:{
    type: String,
    required: true
  },
  adresa:{
    type: String,
    required: true
  },
  parola:{
    type: String,
    required: true
  },
  telefon:{
    type: Number,
    required: true
  },
  tag:{
    type: String,
    required: false
  }
});

let Utilizator = module.exports = mongoose.model('Utilizator', utilizatorSchema, 'utilizator');
