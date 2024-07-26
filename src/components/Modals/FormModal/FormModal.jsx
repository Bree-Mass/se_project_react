import React from "react";
import "../modals.css";
import "./formModal.css";

function FormModal({
  children,
  titleText,
  buttonText,
  activeModal,
  handleCloseModal,
  handleEscClose,
}) {
  const FormModalArea = React.useRef(null);
  const FormContentArea = React.useRef(null);
  const handleOutsideClick = (evt) => {
    if (
      FormModalArea.current.contains(evt.target) &&
      !FormContentArea.current.contains(evt.target)
    ) {
      handleCloseModal();
    }
  };
  React.useEffect(() => {
    if (activeModal === "add-modal") {
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
      className={`modal ${activeModal === "add-modal" && "modal__opened"}`}
      ref={FormModalArea}
    >
      <div className="modal__content" ref={FormContentArea}>
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

export default FormModal;
