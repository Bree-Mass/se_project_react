import React from "react";
import { ModalContext } from "../contexts/ModalContext";
import { UseRefContext } from "../contexts/UseRefContext";
import "../blocks/modals.css";
import "../blocks/itemModal.css";

function ItemModal({ isOpen, card }) {
  const ItemModalContext = React.useContext(ModalContext);
  const RefContext = React.useContext(UseRefContext);

  return (
    <div
      className={`modal ${isOpen ? "modal_opened" : ""}`}
      ref={RefContext.itemModalRef}
    >
      <div className="modal__content modal__content_type_image">
        <button
          className="modal__close-button modal__close-button_type_image"
          type="button"
          onClick={ItemModalContext.closeModals}
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
            className="modal__open_delete-modal-button"
            onClick={ItemModalContext.openModals}
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
