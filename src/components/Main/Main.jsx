import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants";
import "./main.css";

function Main({ weatherData, handleCardClick }) {
  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <section className="main__clothes">
        <div className="main__info">
          <p className="main__description">
            Today is {"Placeholder"}&deg;F and it is {"Placeholder"}. You may
            want to wear:
          </p>
        </div>
        <ul className="main__cards-list">
          {defaultClothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
