import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useFormAndValidation from "../../../hooks/useFormAndValidation";
import { ApiCallContext } from "../../../contexts/ApiCallContext";

function AddItemModal({
  activeModal,
  isOpen,
  handleAddItem,
  addModalRef,
  formRef,
  handleCloseModal,
}) {
  const ApiContext = React.useContext(ApiCallContext);

  // import state for each input field from useFormAndValidation.js
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(true);

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

  const handleFormSubmit = (evt) => {
    // adds the item to the page on successful resonse from the server
    evt.preventDefault();
    ApiContext.postItem(values)
      .then(() => {
        handleAddItem(values);
      })
      .catch(`Error: ${console.error}`);
    handleCloseModal();
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

  //// USE EFFECTS ////

  React.useEffect(() => {
    setIsButtonDisabled(!isValid);
  }, [isValid, activeModal]);

  React.useEffect(() => {
    handleFormReset();
  }, [activeModal]);

  return (
    <ModalWithForm
      titleText="New garment"
      buttonText="Add garment"
      isOpen={isOpen}
      addModalRef={addModalRef}
      formRef={formRef}
      handleCloseModal={handleCloseModal}
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
          // onInput is used instead of onChange so that the
          /// form validation works even when the form is autofilled
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
  );
}

export default React.memo(AddItemModal);
