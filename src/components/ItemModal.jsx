import { memo } from "react";
import "../blocks/modals.css";
import "../blocks/itemModal.css";

function ItemModal({
  card,
  isOpen,
  itemModalRef,
  handleOpen,
  handleCloseModal,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`} ref={itemModalRef}>
      <div className="modal__content modal__content_type_image">
        <button
          className="modal__close-button modal__close-button_type_image"
          type="button"
          onClick={handleCloseModal}
        />
        <img
          src={card.link}
          alt={`Image of ${card.name}`}
          className="modal__image"
        />
        <div className="modal__footer">
          <div>
            <h2 className="modal__footer_name">{card.name}</h2>
            <p className="modal__footer_weather">Weather: {card.weatherType}</p>
          </div>
          <button
            id="confirm-modal"
            className="modal__open_delete-modal-button"
            onClick={handleOpen}
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(ItemModal);
