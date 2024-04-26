function fetchChennaiWeather() {
  const apiKey = '9c3d6b67dfa086c7e8cade9cd8f1eb71';
  const city = 'Chennai';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  return new Promise((resolve, reject) => {
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error fetching weather data: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const weatherInfo = document.getElementById('weather-info');
        weatherInfo.innerHTML = '';

        if (data && data.name && data.weather && data.main) {
          const cityName = document.createElement('h2');
          cityName.textContent = `${data.name}, ${data.sys.country}`;

          const weatherDescription = document.createElement('p');
          weatherDescription.textContent = `${data.weather[0].description}`;

          const temperature = document.createElement('p');
          temperature.textContent = `Temperature: ${data.main.temp} °C`;

          weatherInfo.appendChild(cityName);
          weatherInfo.appendChild(weatherDescription);
          weatherInfo.appendChild(temperature);
        } else {
          const errorMessage = document.createElement('p');
          errorMessage.textContent = 'Error fetching weather data.';
          weatherInfo.appendChild(errorMessage);
        }

        resolve();
      })
      .catch(error => {
        reject(`Error fetching weather data: ${error.message}`);
      });
  });
}

const fetchBtn = document.getElementById('fetch-btn');
fetchBtn.addEventListener('click', () => {
  fetchChennaiWeather()
    .catch(error => {
      console.error('Fetch error:', error);
    });
});
