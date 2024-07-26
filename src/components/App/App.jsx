import React from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import FormModal from "../Modals/FormModal/FormModal";
import ItemModal from "../Modals/ItemModal/ItemModal";
import Footer from "../Footer/Footer";
import { apiCall } from "../../utils/constants";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import "./app.css";

const App = () => {
  const [weatherData, setWeatherData] = React.useState({
    type: "",
    temp: { F: "", C: "" },
    city: "",
    weather: "",
  });
  const [activeModal, setActiveModal] = React.useState("");
  const [selectedCard, setSelectedCard] = React.useState({});

  const handleAddClick = () => {
    setActiveModal("add-modal");
  };

  const handleCardClick = (card) => {
    setActiveModal("card-modal");
    setSelectedCard(card);
  };

  const closeModals = () => {
    setActiveModal("");
  };

  const handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      closeModals();
    }
  };

  React.useEffect(() => {
    getWeather(apiCall)
      .then((data) => {
        setWeatherData(filterWeatherData(data));
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <div className="page__wrapper">
        <Header weatherData={weatherData} handleAddClick={handleAddClick} />
        <Main weatherData={weatherData} handleCardClick={handleCardClick} />
        <Footer />
      </div>
      <FormModal
        titleText="New garment"
        buttonText="Add garment"
        activeModal={activeModal}
        handleCloseModal={closeModals}
        handleEscClose={handleEscClose}
      >
        <label className="modal__label" htmlFor="name">
          Name
          <input
            className="modal__input modal__input_card-name"
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            minLength="1"
            maxLength="30"
            required
          />
          <span className="modal__error"></span>
        </label>
        <label className="modal__label" htmlFor="imageUrl">
          Image
          <input
            className="modal__input  modal__input_url"
            type="url"
            name="link"
            id="imageUrl"
            placeholder="Image URL"
            required
          />
          <span className="modal__error"></span>
        </label>
        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select the weather type:</legend>
          <label className="modal__label_radio" htmlFor="choiceHot">
            <input
              className="modal__input_radio"
              type="radio"
              id="choiceHot"
              name="weatherType"
              value="hot"
            />
            Hot
          </label>
          <label className="modal__label_radio" htmlFor="choiceWarm">
            <input
              className="modal__input_radio"
              type="radio"
              id="choiceWarm"
              name="weatherType"
              value="warm"
            />{" "}
            Warm
          </label>
          <label className="modal__label_radio" htmlFor="choiceCold">
            <input
              className="modal__input_radio"
              type="radio"
              id="choiceCold"
              name="weatherType"
              value="cold"
            />
            Cold
          </label>
        </fieldset>
      </FormModal>
      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        handleCardClick={handleCardClick}
        handleCloseModal={closeModals}
        handleEscClose={handleEscClose}
      />
    </div>
  );
};

export default App;
