import { Link } from "react-router-dom";
import ToggleSwitch from "./ToggleSwitch";
import "../blocks/modals.css";
import "../blocks/menuModal.css";

function MenuModal({
  handleOpen,
  handleCloseModal,
  isOpen,
  avatarPlaceholder,
  menuModalRef,
  isOn,
}) {
  return (
    <div
      className={`modal modal__type_menu-modal ${isOpen ? "modal_opened" : ""}`}
      ref={menuModalRef}
    >
      <div className="modal__content modal__content_type_menu">
        <button
          className="modal__close-button modal__close-button_type_menu"
          type="button"
          onClick={handleCloseModal}
        />
        <Link to="/profile" onClick={handleCloseModal}>
          <div className="modal__user">
            <p className="modal__username">Bree Massingill</p>
            <img
              className="modal__avatar"
              src={avatarPlaceholder}
              alt="avatar"
            />
          </div>
        </Link>
        <button
          id="add-modal"
          className="modal__add-button"
          type="button"
          onClick={handleOpen}
        >
          + Add clothes
        </button>
        <ToggleSwitch isOn={isOn} />
      </div>
    </div>
  );
}

export default MenuModal;
