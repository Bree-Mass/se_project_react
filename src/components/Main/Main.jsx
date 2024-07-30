import React from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants";
import "./main.css";

function Main({ weatherData, handleOpen }) {
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  const [filteredItems, setFilteredItems] = React.useState([]);

  //// HANDLERS ////

  const handleFilter = () => {
    return defaultClothingItems
      .filter((item) => {
        return item.weather === weatherData.type;
      })
      .sort(() => Math.random() - 0.5);
  };

  const handleRenderCards = (array) => {
    return array.map((item) => {
      return <ItemCard key={item._id} item={item} onCardClick={handleOpen} />;
    });
  };

  const handleRandomize = () => {
    setFilteredItems(handleFilter);
  };

  //// USE EFFECTS ////

  // FILTER CARDS //
  React.useEffect(() => {
    setFilteredItems(handleFilter);
  }, [weatherData.type]);

  // CHECK WINDOW SIZE //
  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <section className="main__clothes">
        <p className="main__description">
          Today is {weatherData.temp.F}&deg;F / You may want to wear:
        </p>

        <ul className="main__cards-list">
          {windowWidth > 766
            ? handleRenderCards(filteredItems)
            : handleRenderCards(filteredItems.slice(0, 4))}
        </ul>
      </section>
      <button className="main__randomize-button" onClick={handleRandomize}>
        &#8635; Randomize
      </button>
    </main>
  );
}

export default Main;
