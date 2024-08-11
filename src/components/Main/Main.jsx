import React from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import { CurrentTempUnitContext } from "../../contexts/CurrentTempUnitContext";
import "./main.css";

function Main({ filteredItems, weatherData, renderCards, handleRandomize }) {
  const currentTempUnitContext = React.useContext(CurrentTempUnitContext);
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  // RERENDER //
  React.useEffect(() => {
    renderCards(filteredItems);
  });

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
            ? renderCards(filteredItems)
            : renderCards(filteredItems.slice(0, 4))}
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

export default React.memo(Main);
