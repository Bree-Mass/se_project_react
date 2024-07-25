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

const filterWeatherData = (data) => {
  if (!data) {
    return null;
  }
  const result = {};
  result.city = data.name;
  result.temp = { F: data.main.temp };
  result.weather = data.weather[0].main;
  result.type = getWeatherType(result.temp.F);

  return result;
};

export { getWeather, filterWeatherData };
