import React from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import Footer from "../Footer/Footer";
import { location, apiCall, defaultClothingItems } from "../../utils/constants";
import "./app.css";

const App = () => {
  const [weatherData, setWeatherData] = React.useState({ type: "cold" });

  return (
    <div className="page">
      <div className="page__wrapper">
        <Header />
        <Main weatherData={weatherData} />
        <Footer />
      </div>
      {/* {activeModal === "create" && ( */}
      <ModalWithForm title="new garment" name="new-card" />
      {/* )} */}
      {/* {activeModal === "preview" && (
        <ItemModal card={selectedCard} onClose={closeAllModals} />
      )} */}
    </div>
  );
};

export default App;
