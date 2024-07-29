import "../modals.css";
import "./menuModal.css";

function MenuModal({
  activeModal,
  handleOpen,
  handleCloseModal,
  avatarPlaceholder,
  menuModalRef,
}) {
  return (
    <div
      className={`modal modal__type_menu-modal ${
        activeModal === "menu-modal" ? "modal__opened" : ""
      }`}
      ref={menuModalRef}
    >
      <div className="modal__content modal__content_type_menu">
        <button
          className="modal__close-button modal__close-button_type_menu"
          type="button"
          onClick={handleCloseModal}
        />
        <div className="modal__user">
          <p className="modal__username">Bree Massingill</p>
          <img className="modal__avatar" src={avatarPlaceholder} alt="avatar" />
        </div>
        <button
          id="add-modal"
          className="modal__add-button"
          type="button"
          onClick={handleOpen}
        >
          + Add clothes
        </button>
      </div>
    </div>
  );
}

export default MenuModal;
