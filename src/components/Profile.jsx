import { memo } from "react";
import SideBar from "./SideBar";
import ClothesSection from "./ClothesSection";
import "../blocks/profile.css";

function Profile({
  avatarPlaceholder,
  clothingItems,

  handleOpen,
}) {
  return (
    <div className="profile">
      <SideBar avatarPlaceholder={avatarPlaceholder} />
      <ClothesSection clothingItems={clothingItems} handleOpen={handleOpen} />
    </div>
  );
}

export default memo(Profile);
