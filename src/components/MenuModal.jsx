import React from "react";
import { Link } from "react-router-dom";
import { ModalContext } from "../contexts/ModalContext";
import { UseRefContext } from "../contexts/UseRefContext";
import ToggleSwitch from "./ToggleSwitch";
import "../blocks/modals.css";
import "../blocks/menuModal.css";

function MenuModal({ isOpen, avatarPlaceholder, isOn }) {
  const MenuModalContext = React.useContext(ModalContext);
  const RefContext = React.useContext(UseRefContext);

  return (
    <div
      className={`modal modal__type_menu-modal ${isOpen ? "modal_opened" : ""}`}
      ref={RefContext.menuModalRef}
    >
      <div className="modal__content modal__content_type_menu">
        <button
          className="modal__close-button modal__close-button_type_menu"
          type="button"
          onClick={MenuModalContext.closeModals}
        />
        <Link to="/profile" onClick={MenuModalContext.closeModals}>
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
          onClick={MenuModalContext.openModals}
        >
          + Add clothes
        </button>
        <ToggleSwitch isOn={isOn} />
      </div>
    </div>
  );
}

export default MenuModal;
