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
  const FormModalContext = React.useContext(ModalContext);
  const RefContext = React.useContext(UseRefContext);

  const formModalRef = RefContext[`${modalRefType}ModalRef`];

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`} ref={formModalRef}>
      <div className="modal__content modal__content_type_form">
        <h2 className="modal__title">{titleText}</h2>
        <button
          className="modal__close-button modal__close-button_type_form"
          type="button"
          onClick={FormModalContext.closeModals}
        />
        <form
          className="modal__form"
          ref={RefContext.formRef}
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
