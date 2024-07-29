import "./header.css";
import logo from "../../assets/images/header_logo.svg";

function Header({ weatherData, handleOpen, avatarPlaceholder }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <div className="header">
      <div className="header__info">
        <img className="header__logo" src={logo} alt="logo" />
        <p className="header__date">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <div className="header__interaction">
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
    </div>
  );
}

export default Header;
