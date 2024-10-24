<<<<<<< HEAD
const axios = require('axios');
require('dotenv').config();  // Load environment variables

const API_KEY = process.env.OPENWEATHER_API_KEY;
const CITIES = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];
const UNITS = 'metric';  // 'metric' provides temperature in Celsius

// Function to fetch weather data for a city
const fetchWeatherData = async (city) => {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${UNITS}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data for ${city}: `, error);
  }
};

// Function to get weather updates for all cities
const getWeatherUpdates = async () => {
  const weatherData = {};
  for (const city of CITIES) {
    const data = await fetchWeatherData(city);
    if (data) {
      weatherData[city] = data;
    }
  }
  return weatherData;
};

module.exports = { getWeatherUpdates };
=======
const axios = require('axios');
require('dotenv').config();  // Load environment variables

const API_KEY = process.env.OPENWEATHER_API_KEY;
const CITIES = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];
const UNITS = 'metric';  // 'metric' provides temperature in Celsius

// Function to fetch weather data for a city
const fetchWeatherData = async (city) => {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${UNITS}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data for ${city}: `, error);
  }
};

// Function to get weather updates for all cities
const getWeatherUpdates = async () => {
  const weatherData = {};
  for (const city of CITIES) {
    const data = await fetchWeatherData(city);
    if (data) {
      weatherData[city] = data;
    }
  }
  return weatherData;
};

module.exports = { getWeatherUpdates };
>>>>>>> 40a25abedc62f8c53a7d25b104ec204a5d0c5734
