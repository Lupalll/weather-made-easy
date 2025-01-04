document.getElementById('searchBtn').addEventListener('click', () => {
    const location = document.getElementById('location').value;
    if (!location) return alert('Please enter a location.');

    fetchWeatherData(location);
    fetchWebcamData(location);
});

const fetchWeatherData = (location) => {
    const apiKey = 'b6a3dd77a904c822b523df662f4a0513';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const weatherDiv = document.getElementById('weatherData');
            if (data.cod !== 200) {
                weatherDiv.textContent = 'Weather data not found.';
                return;
            }
            weatherDiv.innerHTML = `
                <p><strong>Temperatur:</strong> ${data.main.temp} °C</p>
                <p><strong>Wind:</strong> ${data.wind.speed} m/s</p>
                <p><strong>Luftfeuchtigkeit:</strong> ${data.main.humidity}%</p>
            `;
        })
        .catch(() => {
            document.getElementById('weatherData').textContent = 'Error fetching weather data.';
        });
};

const fetchWebcamData = (location) => {
    const apiKey = 'YOUR_WEBCAM_API_KEY';
    const url = `https://example-webcam-api.com/getWebcams?location=${location}&key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const webcamDiv = document.getElementById('webcamData');
            if (!data || !data.result) {
                webcamDiv.textContent = 'No webcam available for this location.';
                return;
            }
            webcamDiv.innerHTML = `<img src="${data.result[0].image}" alt="Webcam view">`;
        })
        .catch(() => {
            document.getElementById('webcamData').textContent = 'Error fetching webcam data.';
        });
};

// Dark Mode Togglee
const darkModeToggle = document.getElementById('darkMode');
darkModeToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode', darkModeToggle.checked);
});
