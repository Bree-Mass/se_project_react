import "../modals.css";
import "./itemModal.css";

function ItemModal({ activeModal, card, handleCloseModal }) {
  return (
    <div className={`modal ${activeModal === "card-modal" && "modal__opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button
          className="modal__close-button"
          type="button"
          onClick={handleCloseModal}
        >
          CLOSE
        </button>
        <img src={card.link} alt="" className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__footer_name">{card.name}</h2>
          <p className="modal__footer_weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
