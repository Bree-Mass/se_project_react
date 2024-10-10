import React from "react";
import { Link } from "react-router-dom";
import { ModalContext } from "../contexts/ModalContext";
import { UseRefContext } from "../contexts/UseRefContext";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import ToggleSwitch from "./ToggleSwitch";
import "../blocks/modals.css";
import "../blocks/menuModal.css";

function MenuModal({ isOpen, isOn, isLoggedIn }) {
  const menuModalContext = React.useContext(ModalContext);
  const refContext = React.useContext(UseRefContext);
  const currentUser = React.useContext(CurrentUserContext);
  const [validAvatar, setValidAvatar] = React.useState(true);

  return (
    <div
      className={`modal modal__type_menu-modal ${isOpen ? "modal_opened" : ""}`}
      ref={refContext.menuModalRef}
    >
      <div className="modal__content modal__content_type_menu">
        <button
          className="modal__close-button modal__close-button_type_menu"
          type="button"
          onClick={menuModalContext.closeModals}
        />
        <Link
          to="/profile"
          className="header__link"
          onClick={menuModalContext.closeModals}
        >
          <div className="modal__user">
            <p className="modal__username">
              {isLoggedIn ? currentUser.name : "Log In"}
            </p>
            {isLoggedIn ? (
              currentUser.avatar && validAvatar ? (
                <img
                  className="header__avatar"
                  src={currentUser.avatar}
                  alt="avatar"
                  onError={() => setValidAvatar(false)}
                />
              ) : (
                <div className="header__avatar_placeholder">
                  {currentUser.name[0].toUpperCase()}
                </div>
              )
            ) : null}
          </div>
        </Link>
        <button
          id="add-modal"
          className="modal__add-button"
          type="button"
          onClick={menuModalContext.openModals}
        >
          + Add clothes
        </button>
        <ToggleSwitch isOn={isOn} />
      </div>
    </div>
  );
}

export default MenuModal;
