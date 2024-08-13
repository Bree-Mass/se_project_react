import "../blocks/sideBar.css";

function SideBar({ avatarPlaceholder }) {
  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={avatarPlaceholder} alt="avatar" />
      <div className="sidebar__user">
        <h2 className="sidebar__username">Bree Massingill</h2>
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
