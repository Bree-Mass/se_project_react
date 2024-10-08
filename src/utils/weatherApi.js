import { request } from "./api";

const getWeather = (apiCall) => {
  return request(apiCall);
};

const getWeatherType = (temp) => {
  if (temp >= 77) {
    return "hot";
  } else if (temp >= 60) {
    return "warm";
  } else {
    return "cold";
  }
};

const isDay = (sunrise, sunset, currentTime) => {
  return currentTime > sunrise && currentTime < sunset ? true : false;
};

const filterWeatherData = (data) => {
  if (!data) {
    return null;
  }
  const result = {};
  result.city = data.name;
  result.temp = {
    F: Math.round(data.main.temp),
    C: Math.round(((data.main.temp - 32) * 5) / 9),
  };
  result.type = getWeatherType(result.temp.F);
  result.weather = data.weather[0].main.toLowerCase();
  result.time = Math.round(Date.now() / 1000); // Divide by 1,000 because DATE is measured in Milliseconds, but API is measured in Seconds.
  result.isDay = isDay(data.sys.sunrise, data.sys.sunset, result.time);
  return result;
};

export { getWeather, filterWeatherData };
