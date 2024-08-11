import React from "react";
import "./weatherCard.css";
import {
  weatherBackgrounds,
  defaultWeatherBackgrounds,
} from "../../utils/constants";
import { CurrentTempUnitContext } from "../../contexts/CurrentTempUnitContext";

function WeatherCard({ weatherData }) {
  const currentTempUnitContext = React.useContext(CurrentTempUnitContext);

  const filteredBackgrounds = weatherBackgrounds.filter((options) => {
    return (
      options.isDay === weatherData.isDay &&
      options.weather === weatherData.weather
    );
  });

  let backgroundUrl;

  if (filteredBackgrounds.length > 0) {
    backgroundUrl = filteredBackgrounds[0];
  } else {
    backgroundUrl =
      defaultWeatherBackgrounds[weatherData.isDay ? "day" : "night"];
  }
  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {weatherData.temp[currentTempUnitContext.currentTempUnit]}&deg;
        {currentTempUnitContext.currentTempUnit}
      </p>
      <img
        className="weather-card__image"
        src={backgroundUrl?.url}
        alt={`card with ${weatherData?.weather} weather`}
      />
    </section>
  );
}

export default React.memo(WeatherCard);
