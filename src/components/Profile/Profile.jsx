import SideBar from "./SideBar/SideBar";
import ClothesSection from "./ClothesSection/ClothesSection";

import "./profile.css";

function Profile() {
  return (
    <div className="profile">
      <SideBar />
      <p>sidebar Here</p>
      <ClothesSection />
      <p>Clothes Seciton here</p>
    </div>
  );
}

export default Profile;
