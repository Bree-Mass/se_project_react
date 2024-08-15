import React from "react";
import { v4 as uuidv4 } from "uuid";
import ModalWithForm from "./ModalWithForm";
import useFormAndValidation from "../hooks/useFormAndValidation";

function AddItemModal({
  activeModal,
  isOpen,
  handleAddItem,
  addModalRef,
  formRef,
  handleCloseModal,
}) {
  // import state for each input field from useFormAndValidation.js
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(true);

  const handleFormSubmit = (evt) => {
    // adds the item to the page on successful resonse from the server
    evt.preventDefault();
    const valuesWithId = { _id: uuidv4(), ...values };
    handleAddItem(valuesWithId).then(handleCloseModal).catch(console.error);
  };

  const handleFormReset = () => {
    if (isOpen) {
      resetForm();
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
      <label
        className={`modal__label ${errors.name ? "modal__error" : ""}`}
        htmlFor="name"
      >
        Name*
        <input
          className="modal__input modal__input_name "
          type="text"
          name="name"
          id="name"
          value={values.name || ""}
          placeholder="Name"
          minLength="1"
          maxLength="30"
          onChange={handleChange}
          required
        />
        <span
          className={`modal__validation ${
            errors.name ? "modal__validation_visible" : ""
          }`}
        >
          ({errors.name})
        </span>
      </label>
      <label
        className={`modal__label ${errors.link ? "modal__error" : ""}`}
        htmlFor="imageUrl"
      >
        Image*
        <input
          className="modal__input  modal__input_url"
          type="url"
          name="link"
          id="imageUrl"
          value={values.link || ""}
          placeholder="Image URL"
          onChange={handleChange}
          required
        />
        <span
          className={`modal__validation ${
            errors.link ? "modal__validation_visible" : ""
          }`}
        >
          ({errors.link})
        </span>
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
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
          />
          <span className="modal__label_span">Cold</span>
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
