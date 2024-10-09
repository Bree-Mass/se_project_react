import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { ModalContext } from "../contexts/ModalContext";
import "../blocks/sideBar.css";

function SideBar() {
  const CurrentUser = React.useContext(CurrentUserContext);
  const SideBarModalContext = React.useContext(ModalContext);
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
        <button
          id="edit-modal"
          className="sidebar__button sidebar__button_type_profile"
          type="button"
          onClick={SideBarModalContext.openModals}
        >
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
