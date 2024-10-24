let dailyWeatherData = {}; // Store daily data for each city
const { sendAlertEmail } = require('./emailService');
// Function to update daily weather data for each city
const updateDailyWeatherData = (city, temp, weatherCondition) => {
  if (!dailyWeatherData[city]) {
    dailyWeatherData[city] = {
      temps: [],
      weatherConditions: {},
      maxTemp: -Infinity,
      minTemp: Infinity,
    };
  }

  // Update temperature data
  dailyWeatherData[city].temps.push(temp);
  dailyWeatherData[city].maxTemp = Math.max(dailyWeatherData[city].maxTemp, temp);
  dailyWeatherData[city].minTemp = Math.min(dailyWeatherData[city].minTemp, temp);

  // Update weather condition count
  if (!dailyWeatherData[city].weatherConditions[weatherCondition]) {
    dailyWeatherData[city].weatherConditions[weatherCondition] = 1;
  } else {
    dailyWeatherData[city].weatherConditions[weatherCondition]++;
  }
};

// Function to calculate daily aggregates (average, max, min)
const calculateDailySummary = () => {
  const summaries = {};

  for (const city in dailyWeatherData) {
    const cityData = dailyWeatherData[city];
    const totalTemp = cityData.temps.reduce((acc, temp) => acc + temp, 0);
    const avgTemp = totalTemp / cityData.temps.length;

    // Find dominant weather condition
    let dominantWeather = null;
    let maxCount = 0;
    for (const condition in cityData.weatherConditions) {
      if (cityData.weatherConditions[condition] > maxCount) {
        dominantWeather = condition;
        maxCount = cityData.weatherConditions[condition];
      }
    }

    // Store the summary for the day
    summaries[city] = {
      avgTemp,
      maxTemp: cityData.maxTemp,
      minTemp: cityData.minTemp,
      dominantWeather,
    };
  }

  return summaries;
};

// Function to reset daily data (e.g., at midnight)
const resetDailyData = () => {
  dailyWeatherData = {}; // Clear the data at the end of each day
};

// User-configurable alert thresholds
let alertThresholds = {
  temp: 35, // User-configurable temperature threshold
};

const { sendAlertEmail } = require('./emailService');

const checkForAlerts = (city, temp) => {
  if (temp > alertThresholds.temp) {
    console.log(`Alert: ${city} temperature exceeded ${alertThresholds.temp}°C! Current Temp = ${temp}°C`);
    sendAlertEmail(city, temp); // Send alert email
  }
};


module.exports = { 
  updateDailyWeatherData, 
  calculateDailySummary, 
  resetDailyData, 
  checkForAlerts 
};
