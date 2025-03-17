console.log("script.js is connected!");

// API Headers
const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': 'e27a3186fbmshcb78205760e2b10p14e2bfjsn93092cc24abb', // Replace with a secure way to store API keys
    'x-rapidapi-host': 'open-weather13.p.rapidapi.com'
  }
};

const getWeather = async (city) => {
  try {
    document.getElementById("cityName").innerHTML = city; 

    const url = `https://open-weather13.p.rapidapi.com/city/${encodeURIComponent(city)}/EN`;

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log("API Response:", result);

    if (!result || !result.main || result.main.temp === undefined || !result.weather || result.weather.length === 0) {
      console.error("Error: Required data missing from API response.");
      return;
    }

    // Extract values
    const temperature = result.main.temp;
    const temp_max = result.main.temp_max ?? (temperature + 2);
    const temp_min = result.main.temp_min ?? (temperature - 2);
    const weatherStatus = result.weather[0].main; // ✅ Extract weather condition

    // Update UI
    document.getElementById("temp").innerHTML = `${temperature}°C`;
    document.getElementById("temp_max").innerHTML = `${temp_max}°C`;  
    document.getElementById("temp_min").innerHTML = `${temp_min}°C`;  
    document.getElementById("feels_like").innerHTML = `${result.main.feels_like}°C`;
    document.getElementById("humidity").innerHTML = `${result.main.humidity}%`;
    document.getElementById("wind_speed").innerHTML = `${result.wind.speed} km/h`;
    document.getElementById("wind_degrees").innerHTML = `${result.wind.deg}°`;
    document.getElementById("sunrise").innerHTML = new Date(result.sys.sunrise * 1000).toLocaleTimeString();
    document.getElementById("sunset").innerHTML = new Date(result.sys.sunset * 1000).toLocaleTimeString();

    // ✅ Update background based on weather condition
    changeBg(weatherStatus);

  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
};

// Event Listener for Submit Button
document.getElementById("submitButton").addEventListener("click", (e) => {
  e.preventDefault();
  const city = document.getElementById("city").value.trim();
  
  if (!city) {
    console.error("City name is empty!");
    return;
  }

  getWeather(city);
});

// Function to Change Background
function changeBg(status) {
  const backgrounds = {
      'Clouds': 'assets/clouds1.jpeg',
      'Rain': 'assets/rain1.jpeg',
      'Clear': 'assets/clear1.jpeg',
      'Snow': 'assets/snowy1.jpeg',
      'Sunny': 'assets/sunny1.jpeg',
      'Thunderstorm': 'assets/thunder1.jpg',
      'Drizzle': 'assets/drizzle1.jpeg',
      'Mist': 'assets/mist1.jpeg',
      'Haze': 'assets/haze1.jpg',
      'Fog': 'assets/fog1.jpg',
      'Default': 'assets/Default1.jpeg' // Fixed path and extension
  };

  // Change the background
  document.body.style.backgroundImage = `url('${backgrounds[status] || backgrounds['Default']}')`;
}
