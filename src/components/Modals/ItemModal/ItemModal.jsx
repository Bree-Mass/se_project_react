import React from "react";
import "../modals.css";
import "./itemModal.css";

function ItemModal({ activeModal, card, handleCloseModal, handleEscClose }) {
  const itemModalArea = React.useRef(null);
  const itemContentArea = React.useRef(null);
  const handleOutsideClick = (evt) => {
    if (
      itemModalArea.current.contains(evt.target) &&
      !itemContentArea.current.contains(evt.target)
    ) {
      handleCloseModal();
    }
  };
  React.useEffect(() => {
    if (activeModal === "card-modal") {
      document.addEventListener("click", handleOutsideClick);
      document.addEventListener("keydown", handleEscClose);
      return () => {
        document.removeEventListener("click", handleOutsideClick);
        document.removeEventListener("keydown", handleEscClose);
      };
    }
  }, [activeModal]);
  return (
    <div
      className={`modal ${activeModal === "card-modal" && "modal__opened"}`}
      ref={itemModalArea}
    >
      <div
        className="modal__content modal__content_type_image"
        ref={itemContentArea}
      >
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
