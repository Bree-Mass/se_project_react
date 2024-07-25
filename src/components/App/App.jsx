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
      <ModalWithForm titleText="New garment" buttonText="Add garment">
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
      </ModalWithForm>
      {/* )} */}
      {/* {activeModal === "preview" && (
        <ItemModal card={selectedCard} onClose={closeAllModals} />
      )} */}
    </div>
  );
};

export default App;
