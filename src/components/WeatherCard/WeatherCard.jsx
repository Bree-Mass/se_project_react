import "./weatherCard.css";
import {
  weatherBackgrounds,
  defaultWeatherBackgrounds,
} from "../../utils/constants";

function WeatherCard({ weatherData }) {
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
        The temp is {weatherData.temp.F}&deg;F
      </p>
      <img
        className="weather-card__image"
        src={backgroundUrl?.url}
        alt={`card with ${weatherData?.weather} weather`}
      />
    </section>
  );
}

export default WeatherCard;
