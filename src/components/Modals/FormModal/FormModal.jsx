import "../modals.css";
import "./formModal.css";

function ModalWithForm({
  children,
  titleText,
  buttonText,
  activeModal,
  handleCloseModal,
}) {
  return (
    <div className={`modal ${activeModal === "add-modal" && "modal__opened"}`}>
      <div className="modal__content">
        <h2 className="modal__title">{titleText}</h2>
        <button
          className="modal__close-button"
          type="button"
          onClick={handleCloseModal}
        >
          CLOSE
        </button>
        <form action="" className="modal__form">
          {children}
          <button className="modal__submit-button" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
