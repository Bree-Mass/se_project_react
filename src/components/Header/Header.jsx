import { memo } from "react";
import Switch from "../Switch/Switch";
import "./header.css";
import logo from "../../assets/header_logo.svg";

function Header({ weatherData, handleOpen, avatarPlaceholder, isOn }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <div className="header__info">
        <img className="header__logo" src={logo} alt="logo" />
        <p className="header__date">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <div className="header__interaction">
        <Switch isOn={isOn} />
        <button
          id="add-modal"
          className="header__add-button"
          type="button"
          onClick={handleOpen}
        >
          + Add clothes
        </button>
        <div className="header__user">
          <p className="header__username">Bree Massingill</p>
          <img
            className="header__avatar"
            src={avatarPlaceholder}
            alt="avatar"
          />
        </div>
      </div>
      <button
        id="menu-modal"
        className="header__menu_modal-button"
        onClick={handleOpen}
      ></button>
    </header>
  );
}

export default memo(Header);
