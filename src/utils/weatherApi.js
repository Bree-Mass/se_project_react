const getWeather = (apiCall) => {
  return fetch(apiCall).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  });
};

const getWeatherType = (temp) => {
  if (temp >= 86) {
    return "hot";
  } else if (temp >= 66) {
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
  result.temp = { F: Math.round(data.main.temp) };
  result.type = getWeatherType(result.temp.F);
  result.weather = data.weather[0].main.toLowerCase();
  result.time = Math.round(Date.now() / 1000); // Divide by 1,000 because DATE is measured in Milliseconds, but API is measured in Seconds.
  result.isDay = isDay(data.sys.sunrise, data.sys.sunset, result.time);
  return result;
};

export { getWeather, filterWeatherData };
