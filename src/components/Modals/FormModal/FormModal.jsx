import React from "react";
import "../modals.css";
import "./formModal.css";

function FormModal({
  children,
  titleText,
  buttonText,
  activeModal,
  handleCloseModal,
  addModalRef,
  isButtonDisabled,
}) {
  return (
    <div
      className={`modal ${activeModal === "add-modal" ? "modal__opened" : ""}`}
      ref={addModalRef}
    >
      <div className="modal__content modal__content_type_form">
        <h2 className="modal__title">{titleText}</h2>
        <button
          className="modal__close-button"
          type="button"
          onClick={handleCloseModal}
        />
        <form className="modal__form">
          {children}
          <button
            className="modal__submit-button"
            type="submit"
            disabled={isButtonDisabled}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormModal;
