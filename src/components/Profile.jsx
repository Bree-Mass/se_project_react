import SideBar from "./SideBar";
import ClothesSection from "./ClothesSection";
import "../blocks/profile.css";

function Profile({ clothingItems, onCardLike }) {
  return (
    <div className="profile">
      <SideBar />
      <ClothesSection clothingItems={clothingItems} onCardLike={onCardLike} />
    </div>
  );
}

export default Profile;
