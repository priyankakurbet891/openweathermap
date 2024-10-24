// frontend/script.js
const ctx = document.getElementById('weatherChart').getContext('2d');

const weatherData = {
    labels: ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'],
    datasets: [{
        label: 'Average Temperature (°C)',
        data: [20, 30, 25, 27, 22, 24], // Dummy data, replace with actual data from your backend
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
    }]
};

const weatherChart = new Chart(ctx, {
    type: 'bar',
    data: weatherData,
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
