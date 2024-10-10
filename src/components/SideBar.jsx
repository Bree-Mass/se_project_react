import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { ModalContext } from "../contexts/ModalContext";
import "../blocks/sideBar.css";

function SideBar({ setIsLoggedIn }) {
  const currentUser = React.useContext(CurrentUserContext);
  const sideBarModalContext = React.useContext(ModalContext);
  const [validAvatar, setValidAvatar] = React.useState(true);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
  };

  React.useEffect(() => {
    setValidAvatar(true);
  }, [currentUser.avatar]);

  return (
    <div className="sidebar">
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

      <div className="sidebar__user">
        <h2 className="sidebar__username">{currentUser.name}</h2>
        <button
          id="edit-modal"
          className="sidebar__button sidebar__button_type_profile"
          type="button"
          onClick={sideBarModalContext.openModals}
        >
          Change profile data
        </button>
        <button
          className="sidebar__button sidebar__button_type_logout"
          type="button"
          onClick={handleLogout}
        >
          Log out
        </button>
      </div>
    </div>
  );
}
export default SideBar;
