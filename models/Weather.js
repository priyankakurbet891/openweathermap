<<<<<<< HEAD
// models/Weather.js
const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
  city: { type: String, required: true },
  date: { type: Date, default: Date.now },
  avgTemp: { type: Number, required: true },
  maxTemp: { type: Number, required: true },
  minTemp: { type: Number, required: true },
  dominantWeather: { type: String, required: true },
});

const Weather = mongoose.model('Weather', weatherSchema);

module.exports = Weather;
=======
// models/Weather.js
const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
  city: { type: String, required: true },
  date: { type: Date, default: Date.now },
  avgTemp: { type: Number, required: true },
  maxTemp: { type: Number, required: true },
  minTemp: { type: Number, required: true },
  dominantWeather: { type: String, required: true },
});

const Weather = mongoose.model('Weather', weatherSchema);

module.exports = Weather;
>>>>>>> 40a25abedc62f8c53a7d25b104ec204a5d0c5734
