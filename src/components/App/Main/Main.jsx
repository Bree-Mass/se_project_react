import "./main.css";
import ItemCard from "./ItemCard/ItemCard";
import WeatherCard from "./WeatherCard/WeatherCard";
import "./main.css";

function Main({ weatherData, cards, onCardClick }) {
  //   const temperature = weatherData.temperature;

  const weatherType = () => {
    // EXAMPLE
    // if (temperature >= 86) {
    //   return "hot";
    // } else if (temperature >= 66) {
    //   return "warm";
    // } else {
    //   return "cold";
    // }
  };

  return (
    <main className="main">
      {
        <WeatherCard weatherData={weatherData} />
        /* <section className="main__clothes">
        <div className="main__info">
          <div className="main__description-container">
            <p className="main__description">
              Today is {temperature}&#8457 F and it is {weatherType()}
            </p>
            <p className="main__description_slash">/</p>
            <p className="main__description">You may want to wear:</p>
          </div>
        </div>
        <ul className="main__items">
          {cards
            .filter((card) => card.weather === weatherType())
            .map((filteredCard) => (
              <ItemCard
                key={filteredCard._id}
                card={filteredCard}
                oncardClick={onCardClick}
              />
            ))}
        </ul>
      </section> */
      }
    </main>
  );
}

export default Main;
