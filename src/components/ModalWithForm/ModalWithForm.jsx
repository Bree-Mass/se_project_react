import "./modalWithForm.css";

function ModalWithForm(props) {
  return (
    <div className="modal">
      <div className="modal__content">
        <h2 className="modal__title">{props.titleText}</h2>
        <button className="modal__close-button" type="button">
          CLOSE
        </button>
        <form action="" className="modal__form">
          {props.children}
          <button className="modal__submit-button" type="submit">
            {props.buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
