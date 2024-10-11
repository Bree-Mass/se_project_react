import React from "react";
import { Link } from "react-router-dom";
import ToggleSwitch from "./ToggleSwitch";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { ModalContext } from "../contexts/ModalContext";
import logo from "../assets/header_logo.svg";
import "../blocks/header.css";

function Header({ weatherData, isOn, isLoggedIn }) {
  const currentUser = React.useContext(CurrentUserContext);
  const headerModalContext = React.useContext(ModalContext);
  const [validAvatar, setValidAvatar] = React.useState(true);
  const CurrentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  React.useEffect(() => {
    setValidAvatar(true);
  }, [currentUser.avatar]);

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
        {isLoggedIn ? (
          <button
            id="add-modal"
            className="header__add-button"
            type="button"
            onClick={headerModalContext.openModals}
          >
            + Add clothes
          </button>
        ) : (
          <button
            id="register-modal"
            className="header__add-button"
            type="button"
            onClick={headerModalContext.openModals}
          >
            Sign Up
          </button>
        )}

        {isLoggedIn ? (
          <Link to="/profile" className="header__link">
            <div className="header__user">
              <p className="header__username">{currentUser.name}</p>
              {currentUser.avatar && validAvatar ? (
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
              )}
            </div>
          </Link>
        ) : (
          <button
            id="login-modal"
            className="header__login-button header__username"
            type="button"
            onClick={headerModalContext.openModals}
          >
            Log In
          </button>
        )}
      </div>
      <button
        id="menu-modal"
        className="header__menu_modal-button"
        onClick={headerModalContext.openModals}
      ></button>
    </header>
  );
}

export default Header;
