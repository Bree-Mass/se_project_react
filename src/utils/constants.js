// LOCATION
const location = { latitude: 32.912163, longitude: -96.131226 };

// API CALL

const apiCall = `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&units=imperial&appid=25749e9bb20cf0f2ab39f77a6519c5e4`;

const weatherBackgrounds = [
  {
    isDay: true,
    weather: "clear",
    url: new URL("../assets/day/sunny_day.png", import.meta.url).href,
  },
  {
    isDay: true,
    weather: "clouds",
    url: new URL("../assets/day/cloudy_day.png", import.meta.url).href,
  },
  {
    isDay: true,
    weather: "rain",
    url: new URL("../assets/day/rainy_day.png", import.meta.url).href,
  },
  {
    isDay: true,
    weather: "thunderstorm",
    url: new URL("../assets/day/stormy_day.png", import.meta.url).href,
  },
  {
    isDay: true,
    weather: "snow",
    url: new URL("../assets/day/snowy_day.png", import.meta.url).href,
  },
  {
    isDay: true,
    weather: "fog",
    url: new URL("../assets/day/foggy_day.png", import.meta.url).href,
  },
  {
    isDay: false,
    weather: "clear",
    url: new URL("../assets/night/sunny_night.png", import.meta.url).href,
  },
  {
    isDay: false,
    weather: "clouds",
    url: new URL("../assets/night/cloudy_night.png", import.meta.url).href,
  },
  {
    isDay: false,
    weather: "rain",
    url: new URL("../assets/night/rainy_night.png", import.meta.url).href,
  },
  {
    isDay: false,
    weather: "thunderstorm",
    url: new URL("../assets/night/stormy_night.png", import.meta.url).href,
  },
  {
    isDay: false,
    weather: "snow",
    url: new URL("../assets/night/snowy_night.png", import.meta.url).href,
  },
  {
    isDay: false,
    weather: "fog",
    url: new URL("../assets/night/foggy_night.png", import.meta.url).href,
  },
];

const defaultWeatherBackgrounds = {
  day: {
    url: new URL("../assets/day/default_day.png", import.meta.url).href,
  },
  night: {
    url: new URL("../assets/night/default_night.png", import.meta.url).href,
  },
};

export { location, apiCall, weatherBackgrounds, defaultWeatherBackgrounds };
