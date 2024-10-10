import React from "react";
import { ModalContext } from "../contexts/ModalContext";
import { UseRefContext } from "../contexts/UseRefContext";
import "../blocks/modals.css";
import "../blocks/confirmationModal.css";

function ConfirmationModal({ isOpen, card, handleDelete }) {
  const confirmationModalContext = React.useContext(ModalContext);
  const refContext = React.useContext(UseRefContext);

  return (
    <div
      className={`modal ${isOpen ? "modal_opened" : ""}`}
      ref={refContext.confirmationModalRef}
    >
      <div className="modal__content modal__content_type_confirm">
        <button
          className="modal__close-button modal__close-button_type_image"
          type="button"
          onClick={confirmationModalContext.closeModals}
        />
        <p className="modal__confirmation-text">
          Are you sure you want to delete this item?
          <br />
          This action is irreversible.
        </p>
        <button
          className="modal__delete-button modal__delete-button_accept"
          onClick={() => handleDelete(card)}
        >
          Yes, delete item
        </button>
        <button
          className="modal__delete-button modal__delete-button_cancel"
          onClick={confirmationModalContext.closeModals}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ConfirmationModal;
