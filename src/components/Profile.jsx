import SideBar from "./SideBar";
import ClothesSection from "./ClothesSection";
import "../blocks/profile.css";

function Profile({ clothingItems, handleOpen }) {
  return (
    <div className="profile">
      <SideBar />
      <ClothesSection clothingItems={clothingItems} handleOpen={handleOpen} />
    </div>
  );
}

export default Profile;
