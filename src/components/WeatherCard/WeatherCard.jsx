import "./weatherCard.css";
import { weatherBackgrounds } from "../../utils/constants";

function WeatherCard({ weatherData }) {
  const filteredBackgrounds = weatherBackgrounds.filter((options) => {
    return (
      options.isDay === weatherData.isDay &&
      options.weather === weatherData.weather
    );
  });

  const backgroundUrl = filteredBackgrounds[0]?.url;
  return (
    <section className="weather-card">
      <p className="weather-card__temp">The temp is {weatherData.temp.F}</p>
      <img
        className="weather-card__image"
        src={backgroundUrl}
        alt="weather background"
      />
    </section>
  );
}

export default WeatherCard;
