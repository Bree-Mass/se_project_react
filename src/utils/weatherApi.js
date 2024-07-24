import { apiCall } from "./constants";

const getForecastWeather = (apiCall) => {
  return fetch(apiCall).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  });
};

const filterDataFromWeatherAPI = () => {
  if (!data) {
    return null;
  }
  const weather = {};
  // WE ARE USING A DIFFERENT API FROM THE DEMO VIDEO.
  // CHANGE THIS AS NEEDED

  // weather.city = data.location.name;
  // weather.temperature = data.current.temp_f;
  return weather;
};

export { getForecastWeather, filterDataFromWeatherAPI };
