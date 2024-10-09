import React from "react";
import { Link } from "react-router-dom";
import ToggleSwitch from "./ToggleSwitch";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { ModalContext } from "../contexts/ModalContext";
import logo from "../assets/header_logo.svg";
import "../blocks/header.css";

function Header({ weatherData, isOn, isLoggedIn }) {
  const CurrentUser = React.useContext(CurrentUserContext);
  const HeaderModalContext = React.useContext(ModalContext);
  const CurrentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const [validAvatar, setValidAvatar] = React.useState(true);

  return (
    <header className="header">
      <div className="header__info">
        <Link to="/">
          <img className="header__logo" src={logo} alt="logo" />
        </Link>
        <p className="header__date">
          {CurrentDate}, {weatherData.city}
        </p>
      </div>
      <div className="header__interaction">
        <ToggleSwitch isOn={isOn} />
        <button
          id="add-modal"
          className="header__add-button"
          type="button"
          onClick={HeaderModalContext.openModals}
        >
          + Add clothes
        </button>

        {isLoggedIn ? (
          <Link to="/profile" className="header__link">
            <div className="header__user">
              <p className="header__username">{CurrentUser.name}</p>
              {CurrentUser.avatar && validAvatar ? (
                <img
                  className="header__avatar"
                  src={CurrentUser.avatar}
                  alt="avatar"
                  onError={() => setValidAvatar(false)}
                />
              ) : (
                <div className="header__avatar_placeholder">
                  {CurrentUser.name[0].toUpperCase()}
                </div>
              )}
            </div>
          </Link>
        ) : (
          <button
            id="login-modal"
            className="header__login-button header__username"
            type="button"
            onClick={HeaderModalContext.openModals}
          >
            Log In
          </button>
        )}
      </div>
      <button
        id="menu-modal"
        className="header__menu_modal-button"
        onClick={HeaderModalContext.openModals}
      ></button>
    </header>
  );
}

export default Header;
