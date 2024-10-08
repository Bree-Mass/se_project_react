import React from "react";
import { Link } from "react-router-dom";
import ToggleSwitch from "./ToggleSwitch";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import logo from "../assets/header_logo.svg";
import "../blocks/header.css";

function Header({ weatherData, handleOpen, isOn, isLoggedIn }) {
  const CurrentUser = React.useContext(CurrentUserContext);
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
          onClick={handleOpen}
        >
          + Add clothes
        </button>
        <Link to="/profile" className="header__link">
          <div className="header__user">
            <p className="header__username">
              {isLoggedIn ? CurrentUser.name : "Log In"}
            </p>
            {isLoggedIn ? (
              CurrentUser.avatar && validAvatar ? (
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
              )
            ) : null}
          </div>
        </Link>
      </div>
      <button
        id="menu-modal"
        className="header__menu_modal-button"
        onClick={handleOpen}
      ></button>
    </header>
  );
}

export default Header;
