import "../modals.css";
import "./formModal.css";

function FormModal({
  children,
  titleText,
  buttonText,
  activeModal,
  handleCloseModal,
  addModalRef,
  formRef,
  isButtonDisabled,
  handleSubmit,
}) {
  return (
    <div
      className={`modal ${activeModal === "add-modal" ? "modal__opened" : ""}`}
      ref={addModalRef}
    >
      <div className="modal__content modal__content_type_form">
        <h2 className="modal__title">{titleText}</h2>
        <button
          className="modal__close-button modal__close-button_type_form"
          type="button"
          onClick={handleCloseModal}
        />
        <form className="modal__form" ref={formRef} onSubmit={handleSubmit}>
          {children}
          <button
            className="modal__submit-button"
            type="submit"
            disabled={isButtonDisabled}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormModal;
