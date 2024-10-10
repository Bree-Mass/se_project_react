import React from "react";
import { ModalContext } from "../contexts/ModalContext";
import { UseRefContext } from "../contexts/UseRefContext";
import "../blocks/modals.css";
import "../blocks/modalWithForm.css";

function ModalWithForm({
  children,
  titleText,
  buttonText,
  modalRefType,
  isOpen,
  isButtonDisabled,
  handleSubmit,
}) {
  const formModalContext = React.useContext(ModalContext);
  const refContext = React.useContext(UseRefContext);

  const formModalRef = refContext[`${modalRefType}ModalRef`];

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`} ref={formModalRef}>
      <div className="modal__content modal__content_type_form">
        <h2 className="modal__title">{titleText}</h2>
        <button
          className="modal__close-button modal__close-button_type_form"
          type="button"
          onClick={formModalContext.closeModals}
        />
        <form
          className="modal__form"
          ref={refContext.formRef}
          onSubmit={handleSubmit}
        >
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

export default ModalWithForm;
