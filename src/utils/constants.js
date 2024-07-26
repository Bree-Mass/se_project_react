// LOCATION
const location = { latitude: 32.912163, longitude: -96.131226 };
const locationString = `${location.latitude}, ${location.longitude}`;

// API CALL WITH KEY

const apiKey = "25749e9bb20cf0f2ab39f77a6519c5e4";
const apiCall = `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&units=imperial&appid=${apiKey}`;

// DEFAULT CLOTHES

const defaultClothingItems = [
  {
    _id: 0,
    name: "Cap",
    weather: "hot",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Cap.png?etag=f3dad389b22909cafa73cff9f9a3d591",
  },
  {
    _id: 1,
    name: "Hoodie",
    weather: "warm",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Hoodie.png?etag=5f52451d0958ccb1016c78a45603a4e8",
  },
  {
    _id: 2,
    name: "Jacket",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Jacket.png?etag=f4bb188deaa25ac84ce2338be2d404ad",
  },
  {
    _id: 3,
    name: "Sneakers",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Sneakers.png?etag=3efeec41c1c78b8afe26859ca7fa7b6f",
  },
  {
    _id: 4,
    name: "T-Shirt",
    weather: "hot",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/T-Shirt.png?etag=44ed1963c44ab19cd2f5011522c5fc09",
  },
  {
    _id: 5,
    name: "Coat",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Coat.png?etag=298717ed89d5e40b1954a1831ae0bdd4",
  },
];

const weatherBackgrounds = [
  {
    isDay: true,
    weather: "clear",
    url: new URL("../assets/images/day/sunny_day.png", import.meta.url).href,
  },
  {
    isDay: true,
    weather: "clouds",
    url: new URL("../assets/images/day/cloudy_day.png", import.meta.url).href,
  },
  {
    isDay: true,
    weather: "rain",
    url: new URL("../assets/images/day/rainy_day.png", import.meta.url).href,
  },
  {
    isDay: true,
    weather: "thunderstorm",
    url: new URL("../assets/images/day/stormy_day.png", import.meta.url).href,
  },
  {
    isDay: true,
    weather: "snow",
    url: new URL("../assets/images/day/snowy_day.png", import.meta.url).href,
  },
  {
    isDay: true,
    weather: "fog",
    url: new URL("../assets/images/day/foggy_day.png", import.meta.url).href,
  },
  {
    isDay: false,
    weather: "clear",
    url: new URL("../assets/images/night/sunny_night.png", import.meta.url)
      .href,
  },
  {
    isDay: false,
    weather: "clouds",
    url: new URL("../assets/images/night/cloudy_night.png", import.meta.url)
      .href,
  },
  {
    isDay: false,
    weather: "rain",
    url: new URL("../assets/images/night/rainy_night.png", import.meta.url)
      .href,
  },
  {
    isDay: false,
    weather: "thunderstorm",
    url: new URL("../assets/images/night/stormy_night.png", import.meta.url)
      .href,
  },
  {
    isDay: false,
    weather: "snow",
    url: new URL("../assets/images/night/snowy_night.png", import.meta.url)
      .href,
  },
  {
    isDay: false,
    weather: "fog",
    url: new URL("../assets/images/night/foggy_night.png", import.meta.url)
      .href,
  },
];

export {
  location,
  locationString,
  apiKey,
  apiCall,
  defaultClothingItems,
  weatherBackgrounds,
};
