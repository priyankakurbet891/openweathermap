Here's the full `README.md` file based on the **Weather Monitoring System** project:

---

# Weather Monitoring System

## Description
The **Weather Monitoring System** is a real-time weather monitoring application that fetches weather data for multiple cities and provides alerts when specified temperature thresholds are exceeded. The system uses the **OpenWeatherMap API** to fetch weather data, stores the data in **MongoDB**, and sends email alerts using **Nodemailer**.

## Features:
- Fetches real-time weather data from the **OpenWeatherMap API** for multiple cities.
- Monitors cities and stores weather data in **MongoDB**.
- Sends email alerts when temperature thresholds are exceeded.
- Provides daily weather summaries with average, minimum, and maximum temperature rollups.

## Technologies Used:
- **Node.js**: Server-side JavaScript runtime.
- **Express.js**: Web framework for handling API requests.
- **MongoDB**: Database for storing weather data.
- **Axios**: HTTP client for fetching data from the OpenWeatherMap API.
- **Nodemailer**: Sends email alerts based on weather conditions.
- **OpenWeatherMap API**: Provides weather data for multiple cities.

## Prerequisites:
- **Node.js** installed on your machine. You can download it [here](https://nodejs.org/).
- **MongoDB** installed locally or using **MongoDB Atlas** for cloud-based storage. Installation instructions [here](https://docs.mongodb.com/manual/installation/).
- **OpenWeatherMap API Key**: Sign up and get your API key from [OpenWeatherMap](https://openweathermap.org/api).

## Installation Instructions:
1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd weather-monitoring-system
   ```

2. **Install Dependencies**:
   Inside the project directory, run:
   ```bash
   npm install
   ```

3. **Set up MongoDB**:
   - Ensure MongoDB is running on your local machine or configure MongoDB Atlas.
   - The MongoDB URI should be set in a `.env` file (see the next step).

4. **Create a `.env` File**:
   In the project root, create a `.env` file with the following details:
   ```
   MONGO_URI=mongodb://localhost:27017/weatherMonitoringDB
   OPENWEATHER_API_KEY=<your_openweathermap_api_key>
   EMAIL_SERVICE=<gmail>
   EMAIL_USER=<priyankakurbet417@gmail.com>
   EMAIL_PASS=<Priya@123poorvi>
   ```

5. **Start the Application**:
   Start the server using:
   ```bash
   npm start
   ```

6. **Test the Application**:
   - The app will start fetching weather data for the configured cities and storing it in MongoDB.
   - Email alerts will be sent if the specified temperature thresholds are met.

## API Endpoints:
- **`GET /weather`**: Fetches the current weather data for the monitored cities.
- **`POST /alert`**: Allows you to configure alert thresholds for temperature.

## Usage Example:
To configure a temperature threshold alert, you can send a POST request like this:
```bash
curl -X POST http://localhost:3000/alert \
  -H "Content-Type: application/json" \
  -d '{"city": "Delhi", "threshold": 35}'
```

## Contributing:
Feel free to submit issues, fork the repository, and send pull requests to improve the system.

## License:
This project is licensed under the MIT License.

---

This `README.md` includes all necessary instructions for setting up, running, and testing your **Weather Monitoring System** project with MongoDB and the OpenWeatherMap API. You can modify the file by filling in `<repository-url>` with your actual repository link, and `<your_openweathermap_api_key>`, `<your_email_service>`, `<your_email_address>`, and `<your_email_password>` with the appropriate values in the `.env` file.
