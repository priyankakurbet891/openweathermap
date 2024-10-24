// main.js
const express = require('express');
const cron = require('node-cron');
const connectDB = require('./db'); // Make sure to implement the connectDB function
const Weather = require('./models/Weather'); // Ensure this model is defined in your models folder
const { sendAlertEmail } = require('./emailService'); // Ensure this function is defined in your email service
const axios = require('axios');
require('dotenv').config();

// Connect to MongoDB
connectDB();

const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];
const dailyWeatherData = {};
const alertThresholds = {
  temp: 35, // Example threshold for temperature
};

// Fetch weather data for each city
const fetchWeatherData = async () => {
  for (const city of cities) {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHERMAP_API_KEY}`);
      const tempKelvin = response.data.main.temp;
      const tempCelsius = tempKelvin - 273.15; // Convert Kelvin to Celsius
      const weatherCondition = response.data.weather[0].main;

      // Store the weather data
      dailyWeatherData[city] = dailyWeatherData[city] || [];
      dailyWeatherData[city].push({
        temp: tempCelsius,
        weather: weatherCondition,
        timestamp: response.data.dt,
      });

      console.log(`Fetched data for ${city}: ${tempCelsius.toFixed(2)}°C, Condition: ${weatherCondition}`);
      
      // Check for alerts after fetching data
      checkForAlerts(city, tempCelsius); 
    } catch (error) {
      console.error(`Error fetching data for ${city}:`, error.message);
    }
  }
};

// Calculate daily summary and save to the database
const calculateDailySummary = () => {
  const dailySummary = {};
  for (const city in dailyWeatherData) {
    const records = dailyWeatherData[city];
    const totalTemp = records.reduce((sum, record) => sum + record.temp, 0);
    const maxTemp = Math.max(...records.map(record => record.temp));
    const minTemp = Math.min(...records.map(record => record.temp));
    const dominantWeather = getDominantWeather(records);

    dailySummary[city] = {
      avgTemp: totalTemp / records.length,
      maxTemp,
      minTemp,
      dominantWeather,
    };
  }
  return dailySummary;
};

// Function to determine the dominant weather condition
const getDominantWeather = (records) => {
  const weatherCount = {};
  records.forEach(record => {
    weatherCount[record.weather] = (weatherCount[record.weather] || 0) + 1;
  });
  return Object.keys(weatherCount).reduce((a, b) => weatherCount[a] > weatherCount[b] ? a : b);
};

// Function to check for alerts based on temperature thresholds
const checkForAlerts = (city, temp) => {
  if (temp > alertThresholds.temp) {
    console.log(`Alert: ${city} temperature exceeded ${alertThresholds.temp}°C! Current Temp = ${temp.toFixed(2)}°C`);
    sendAlertEmail(city, temp); // Send alert email
  }
};

// Schedule weather data fetch every 5 minutes
cron.schedule('*/5 * * * *', fetchWeatherData);

// Schedule daily summary calculation at midnight
cron.schedule('0 0 * * *', async () => {
  console.log('Calculating daily weather summary...');
  const dailySummary = calculateDailySummary();
  console.log('Daily Summary:', dailySummary);

  // Save the summary to the database
  for (const city in dailySummary) {
    const summary = dailySummary[city];
    const weatherData = new Weather({
      city,
      avgTemp: summary.avgTemp,
      maxTemp: summary.maxTemp,
      minTemp: summary.minTemp,
      dominantWeather: summary.dominantWeather,
    });
    await weatherData.save(); // Save to the database
  }

  // Reset daily data after summary calculation
  resetDailyData();
});

// Function to reset daily data
const resetDailyData = () => {
  for (const city in dailyWeatherData) {
    dailyWeatherData[city] = [];
  }
};

// Set up Express server
const PORT = process.env.PORT || 3000;
const app = express();

app.get('/', (req, res) => {
  res.send('Weather Monitoring System is running.');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
