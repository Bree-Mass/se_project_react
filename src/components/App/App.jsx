import React from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../Modals/ModalWithForm/ModalWithForm";
import ItemModal from "../Modals/ItemModal/ItemModal";
import MenuModal from "../Modals/MenuModal/MenuModal";
import Footer from "../Footer/Footer";
import avatarPlaceholder from "../../assets/avatar_placeholder.png";
import useFormAndValidation from "../../hooks/useFormAndValidation";
import { apiCall } from "../../utils/constants";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import "./app.css";

const App = () => {
  //// USE STATES ////
  const [activeModal, setActiveModal] = React.useState(null);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(true);
  const [weatherData, setWeatherData] = React.useState({
    type: "",
    temp: { F: "", C: "" },
    city: "",
    weather: "",
  }); // sets all form elements with a default validation message

  //// USE REFS ////

  const formRef = React.useRef(null);
  const addModalRef = React.useRef(null);
  const itemModalRef = React.useRef(null);
  const menuModalRef = React.useRef(null);

  //// HANDLE MODALS ////

  // if the object clicked does not have a key "_id" then use the objects id.
  const openModals = (card) => {
    if (!isNaN(card._id)) {
      setActiveModal("card-modal");
      setSelectedCard(card);
    } else {
      setActiveModal(card.target.id);
    }
  };
  const closeModals = () => {
    handleFormReset();
    setActiveModal(null);
  };

  //// FORM VALIDATION ////

  const { handleChange, errors, isValid, resetForm } = useFormAndValidation();

  const handleTextChange = (evt) => {
    // sets the validation message when typing in a form element
    handleChange(evt);
    if (!evt.target.checkValidity()) {
      evt.target.parentElement.classList.add("modal__error");
      evt.target.nextElementSibling.classList.add("modal__validation_visible");
    } else {
      evt.target.parentElement.classList.remove("modal__error");
      evt.target.nextElementSibling.classList.remove(
        "modal__validation_visible"
      );
    }
  };

  const handleRadioChange = (evt) => {
    // enables validation when a radio button is active
    handleChange(evt);
  };

  const handleFormReset = () => {
    // checks if a form and its validation needs to be reset
    if (activeModal === "add-modal") {
      formRef.current.reset();
      resetForm();
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
    const handleOutsideClick = (evt) => {
      if (
        evt.target === itemModalRef.current ||
        evt.target === addModalRef.current ||
        evt.target === menuModalRef.current
      ) {
        closeModals();
      }
    };
    const handleEscClose = (evt) => {
      if (evt.key === "Escape") {
        closeModals();
      }
    };

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
    setIsButtonDisabled(!isValid);
  }, [isValid, activeModal]);

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
        <Header
          weatherData={weatherData}
          handleOpen={openModals}
          avatarPlaceholder={avatarPlaceholder}
        />
        <Main weatherData={weatherData} handleOpen={openModals} />
        <Footer />
      </div>
      <ModalWithForm
        titleText="New garment"
        buttonText="Add garment"
        isOpen={activeModal === "add-modal"}
        addModalRef={addModalRef}
        formRef={formRef}
        handleCloseModal={closeModals}
        isButtonDisabled={!isButtonDisabled}
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
          <span className="modal__validation">({errors.name})</span>
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
          <span className="modal__validation">({errors.link})</span>
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
      </ModalWithForm>
      <ItemModal
        card={selectedCard}
        isOpen={activeModal === "card-modal"}
        itemModalRef={itemModalRef}
        handleOpen={openModals}
        handleCloseModal={closeModals}
      />
      <MenuModal
        menuModalRef={menuModalRef}
        handleOpen={openModals}
        handleCloseModal={closeModals}
        isOpen={activeModal === "menu-modal"}
        avatarPlaceholder={avatarPlaceholder}
      />
    </div>
  );
};

export default App;
