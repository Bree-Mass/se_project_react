import React from "react";
import { ModalContext } from "../contexts/ModalContext";
import { UseRefContext } from "../contexts/UseRefContext";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import "../blocks/modals.css";
import "../blocks/itemModal.css";

function ItemModal({ isOpen, card }) {
  const itemModalContext = React.useContext(ModalContext);
  const refContext = React.useContext(UseRefContext);
  const currentUser = React.useContext(CurrentUserContext);

  const itemDeleteButtonClassName = `${
    card.owner === currentUser._id
      ? "modal__open_delete_visible"
      : "modal__open_delete_hidden"
  }`;

  return (
    <div
      className={`modal ${isOpen ? "modal_opened" : ""}`}
      ref={refContext.itemModalRef}
    >
      <div className="modal__content modal__content_type_image">
        <button
          className="modal__close-button modal__close-button_type_image"
          type="button"
          onClick={itemModalContext.closeModals}
        />
        <img
          src={card.imageUrl}
          alt={`Image of ${card.name}`}
          className="modal__image"
        />
        <div className="modal__footer">
          <div>
            <h2 className="modal__footer_name">{card.name}</h2>
            <p className="modal__footer_weather">Weather: {card.weather}</p>
          </div>
          <button
            id="confirm-modal"
            className={`modal__open_delete-modal-button ${itemDeleteButtonClassName}`}
            onClick={itemModalContext.openModals}
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
