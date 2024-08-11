import React from "react";
import "../modals.css";
import "./confirmationModal.css";

function ConfirmationModal({
  card,
  isOpen,
  handleCloseModal,
  confirmationModalRef,
  handleDelete,
}) {
  return (
    <div
      className={`modal ${isOpen ? "modal_opened" : ""}`}
      ref={confirmationModalRef}
    >
      <div className="modal__content modal__content_type_confirm">
        <button
          className="modal__close-button modal__close-button_type_image"
          type="button"
          onClick={handleCloseModal}
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
          onClick={handleCloseModal}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default React.memo(ConfirmationModal);
