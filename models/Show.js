const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
    show_id: String,
    type: String,
    title: String,
    director: String,
    cast: String,
    country: String,
    date_added: Date,
    release_year: Number,
    rating: String,
    duration: String,
    listed_in: String,
    description: String,
  });
  
  module.exports = mongoose.model('Show', showSchema);
  

