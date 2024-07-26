import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants";
import "./main.css";

function Main({ weatherData, handleOpen }) {
  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <section className="main__clothes">
        <p className="main__description">
          Today is {weatherData.temp.F}&deg;F / You may want to wear:
        </p>
        <ul className="main__cards-list">
          {defaultClothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard key={item._id} item={item} onCardClick={handleOpen} />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
