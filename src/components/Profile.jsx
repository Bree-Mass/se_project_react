import SideBar from "./SideBar";
import ClothesSection from "./ClothesSection";
import "../blocks/profile.css";

function Profile({ clothingItems, onCardLike, isLoggedIn, setIsLoggedIn }) {
  return (
    <div className="profile">
      <SideBar setIsLoggedIn={setIsLoggedIn} />
      <ClothesSection
        clothingItems={clothingItems}
        onCardLike={onCardLike}
        isLoggedIn={isLoggedIn}
      />
    </div>
  );
}

export default Profile;
