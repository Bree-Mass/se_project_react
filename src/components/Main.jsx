import React from "react";
import WeatherCard from "./WeatherCard";
import ItemCard from "./ItemCard";
import { CurrentTempUnitContext } from "../contexts/CurrentTempUnitContext";
import { ModalContext } from "../contexts/ModalContext";
import "../blocks/main.css";

function Main({ filteredItems, weatherData, handleRandomize, onCardLike }) {
  const currentTempUnitContext = React.useContext(CurrentTempUnitContext);
  const MainModalContext = React.useContext(ModalContext);
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

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
          Today is {weatherData.temp[currentTempUnitContext.currentTempUnit]}
          &deg;{currentTempUnitContext.currentTempUnit} / You may want to wear:
        </p>
        <ul className="main__cards-list">
          {windowWidth > 766
            ? filteredItems.map((item) => (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={MainModalContext.openModals}
                  onCardLike={onCardLike}
                />
              ))
            : filteredItems
                .slice(0, 4)
                .map((item) => (
                  <ItemCard
                    key={item._id}
                    item={item}
                    onCardClick={MainModalContext.openModals}
                    onCardLike={onCardLike}
                  />
                ))}
        </ul>
      </section>
      <button
        className="main__randomize-button"
        type="button"
        onClick={handleRandomize}
      >
        &#8635; Randomize
      </button>
    </main>
  );
}

export default Main;
