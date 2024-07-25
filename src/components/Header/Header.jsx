import "./header.css";
import logo from "../../assets/images/header_logo.svg";
import avatarPlaceholder from "../../assets/images/avatar_placeholder.png";
import { locationString } from "../../utils/constants";

function Header() {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <div className="header">
      <div className="header__info">
        <img className="header__logo" src={logo} alt="logo" />
        <p className="header__date">
          {currentDate}, {locationString}
        </p>
      </div>
      <div className="header__user">
        <button className="header__add-button">+ Add Clothes</button>
        <p className="header__username">Bree Massingill</p>
        <img className="header__avatar" src={avatarPlaceholder} alt="avatar" />
      </div>
    </div>
  );
}

export default Header;
