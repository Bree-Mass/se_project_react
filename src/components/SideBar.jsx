import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import "../blocks/sideBar.css";

function SideBar() {
  const CurrentUser = React.useContext(CurrentUserContext);
  const [validAvatar, setValidAvatar] = React.useState(true);

  return (
    <div className="sidebar">
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

      <div className="sidebar__user">
        <h2 className="sidebar__username">{CurrentUser.name}</h2>
        <button className="sidebar__button sidebar__button_type_profile">
          Change profile data
        </button>
        <button className="sidebar__button sidebar__button_type_logout">
          Log out
        </button>
      </div>
    </div>
  );
}
export default SideBar;
