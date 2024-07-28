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
  //// USE STATES ////
  const [weatherData, setWeatherData] = React.useState({
    type: "",
    temp: { F: "", C: "" },
    city: "",
    weather: "",
  });
  const [activeModal, setActiveModal] = React.useState(null);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(true);
  const [formValidation, setFormValidation] = React.useState({
    name: "inactive",
    link: "inactive",
    radio: "inactive",
  }); // sets all form elements with a default validation message

  //// USE REFS ////

  const addModalRef = React.useRef(null);
  const formRef = React.useRef(null);
  const itemModalRef = React.useRef(null);

  //// HANDLE MODALS ////

  const openModals = (card) => {
    // checks which modal needs to be opened
    // will need to change when more modals are implemented
    !isNaN(card._id)
      ? (setActiveModal("card-modal"), setSelectedCard(card))
      : setActiveModal("add-modal");
  };
  const closeModals = () => {
    handleFormReset();
    setActiveModal(null);
  };
  const handleOutsideClick = (evt) => {
    if (
      evt.target === itemModalRef.current ||
      evt.target === addModalRef.current
    ) {
      closeModals();
    }
  };
  const handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      closeModals();
    }
  };

  //// FORM VALIDATION ////

  const handleTextChange = (evt) => {
    // sets the validation message when typing in a form element
    if (!evt.target.checkValidity()) {
      setFormValidation({
        ...formValidation,
        [evt.target.name]: evt.target.validationMessage,
      });
      evt.target.parentElement.classList.add("modal__error");
      evt.target.nextElementSibling.classList.add("modal__validation_visible");
    } else {
      evt.target.parentElement.classList.remove("modal__error");
      evt.target.nextElementSibling.classList.remove(
        "modal__validation_visible"
      );
      setFormValidation({
        ...formValidation,
        [evt.target.name]: "",
      });
    }
  };

  const handleRadioChange = () => {
    // enables validation when a radio button is active
    setFormValidation({
      ...formValidation,
      radio: "",
    });
  };

  const handleFormReset = () => {
    // checks if a form and its validation needs to be reset
    if (activeModal === "add-modal") {
      formRef.current.reset();
      for (let element of formRef.current.elements) {
        if (element.parentElement.classList.contains("modal__error")) {
          element.parentElement.classList.remove("modal__error");
        }
        if (
          element.nextElementSibling &&
          element.nextElementSibling.classList.contains(
            "modal__validation_visible"
          )
        ) {
          element.nextElementSibling.classList.remove(
            "modal__validation_visible"
          );
        }
      }
      setFormValidation({
        name: "inactive",
        link: "inactive",
        radio: "inactive",
      });
    }
  };

  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    closeModals();
  };

  //// USE EFFECTS ////

  // MODAL //
  React.useEffect(() => {
    // sets/removes event listeners whenever a modal is opened/closed
    if (activeModal) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("keydown", handleEscClose);
      return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
        document.removeEventListener("keydown", handleEscClose);
      };
    }
  }, [activeModal]);

  // FORM //
  React.useEffect(() => {
    // form is invalid if any validation message is present.
    const isFormValid = Object.values(formValidation).every(
      (validationMessage) => validationMessage === ""
    );
    setIsButtonDisabled(!isFormValid);
  }, [formValidation, activeModal]);

  // WEATHER API //
  React.useEffect(() => {
    getWeather(apiCall)
      .then((data) => {
        setWeatherData(filterWeatherData(data));
      })
      .catch(console.error);
  }, []);

  //// RETURN ELEMENT ////

  return (
    <div className="page">
      <div className="page__content">
        <Header weatherData={weatherData} handleOpen={openModals} />
        <Main weatherData={weatherData} handleOpen={openModals} />
        <Footer />
      </div>
      <FormModal
        titleText="New garment"
        buttonText="Add garment"
        activeModal={activeModal}
        addModalRef={addModalRef}
        formRef={formRef}
        handleCloseModal={closeModals}
        isButtonDisabled={isButtonDisabled}
        handleSubmit={handleFormSubmit}
      >
        <label className="modal__label" htmlFor="name">
          Name*
          <input
            className="modal__input modal__input_name"
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            minLength="1"
            maxLength="30"
            onInput={handleTextChange}
            required
          />
          <span className="modal__validation">({formValidation.name})</span>
        </label>
        <label className="modal__label" htmlFor="imageUrl">
          Image*
          <input
            className="modal__input  modal__input_url"
            type="url"
            name="link"
            id="imageUrl"
            placeholder="Image URL"
            onInput={handleTextChange}
            required
          />
          <span className="modal__validation">({formValidation.link})</span>
        </label>
        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select the weather type:</legend>
          <label className="modal__label_radio" htmlFor="choiceHot">
            <input
              className="modal__input modal__input_radio"
              type="radio"
              id="choiceHot"
              name="weatherType"
              value="hot"
              onInput={handleRadioChange}
              required
            />
            <span className="modal__label_span">Hot</span>
          </label>
          <label className="modal__label_radio" htmlFor="choiceWarm">
            <input
              className="modal__input modal__input_radio"
              type="radio"
              id="choiceWarm"
              name="weatherType"
              value="warm"
              onInput={handleRadioChange}
            />
            <span className="modal__label_span">Warm</span>
          </label>
          <label className="modal__label_radio" htmlFor="choiceCold">
            <input
              className="modal__input modal__input_radio"
              type="radio"
              id="choiceCold"
              name="weatherType"
              value="cold"
              onInput={handleRadioChange}
            />
            <span className="modal__label_span">Cold</span>
          </label>
        </fieldset>
      </FormModal>
      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        itemModalRef={itemModalRef}
        handleOpen={openModals}
        handleCloseModal={closeModals}
      />
    </div>
  );
};

export default App;
