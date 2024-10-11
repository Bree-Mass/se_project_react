import ModalWithForm from "./ModalWithForm";
import useFormAndValidation from "../hooks/useFormAndValidation";

function AddItemModal({ isOpen, handleAddItem, isLoading }) {
  const { values, handleChange, errors, isButtonDisabled } =
    useFormAndValidation(isOpen);

  const handleAddItemSubmit = (evt) => {
    evt.preventDefault();
    handleAddItem(values);
  };

  return (
    <ModalWithForm
      titleText="New garment"
      buttonText={isLoading ? "Saving..." : "Add garment"}
      modalRefType="addItem"
      isOpen={isOpen}
      isButtonDisabled={isButtonDisabled}
      handleSubmit={handleAddItemSubmit}
    >
      <label
        className={`modal__label ${errors.name ? "modal__error" : ""}`}
        htmlFor="name"
      >
        Name*
        <input
          className="modal__input modal__input_name"
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
        className={`modal__label ${errors.imageUrl ? "modal__error" : ""}`}
        htmlFor="imageUrl"
      >
        Image*
        <input
          className="modal__input  modal__input_url"
          type="url"
          name="imageUrl"
          id="imageUrl"
          value={values.imageUrl || ""}
          placeholder="Image URL"
          onChange={handleChange}
          required
        />
        <span
          className={`modal__validation ${
            errors.imageUrl ? "modal__validation_visible" : ""
          }`}
        >
          ({errors.imageUrl})
        </span>
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label className="modal__label_radio" htmlFor="choiceHot">
          <input
            className="modal__input modal__input_radio"
            type="radio"
            id="choiceHot"
            name="weather"
            value="hot"
            checked={values.weather === "hot"}
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
            name="weather"
            value="warm"
            checked={values.weather === "warm"}
            onChange={handleChange}
          />
          <span className="modal__label_span">Warm</span>
        </label>
        <label className="modal__label_radio" htmlFor="choiceCold">
          <input
            className="modal__input modal__input_radio"
            type="radio"
            id="choiceCold"
            name="weather"
            value="cold"
            checked={values.weather === "cold"}
            onChange={handleChange}
          />
          <span className="modal__label_span">Cold</span>
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
