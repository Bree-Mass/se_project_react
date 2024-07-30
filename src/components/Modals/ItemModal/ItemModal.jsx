import "../modals.css";
import "./itemModal.css";

function ItemModal({ card, isOpen, handleCloseModal, itemModalRef }) {
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
          <h2 className="modal__footer_name">{card.name}</h2>
          <p className="modal__footer_weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
