import "./weatherCard.css";
import sunnyDay from "../../assets/images/sunny_day.png";
import sunnyNight from "../../assets/images/sunny_night.png";
import cloudyDay from "../../assets/images/cloudy_day.png";
import cloudyNight from "../../assets/images/cloudy_night.png";
import rainyDay from "../../assets/images/rainy_day.png";
import rainyNight from "../../assets/images/rainy_night.png";
import stormyDay from "../../assets/images/stormy_day.png";
import stormyNight from "../../assets/images/stormy_night.png";
import snowyDay from "../../assets/images/snowy_day.png";
import snowyNight from "../../assets/images/snowy_night.png";
import foggyDay from "../../assets/images/foggy_day.png";
import foggyNight from "../../assets/images/foggy_night.png";

function WeatherCard() {
  return (
    <section className="weather-card">
      <p className="weather-card__temp">The temp is {"placeholder"}</p>
      <img
        className="weather-card__image"
        src={sunnyDay}
        alt="weather background"
      />
    </section>
  );
}

export default WeatherCard;
