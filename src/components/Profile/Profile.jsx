import { memo } from "react";
import SideBar from "./SideBar/SideBar";
import ClothesSection from "./ClothesSection/ClothesSection";

import "./profile.css";

function Profile({
  avatarPlaceholder,
  clothingItems,
  renderCards,
  handleOpen,
}) {
  return (
    <div className="profile">
      <SideBar avatarPlaceholder={avatarPlaceholder} />
      <ClothesSection
        clothingItems={clothingItems}
        renderCards={renderCards}
        handleOpen={handleOpen}
      />
    </div>
  );
}

export default memo(Profile);
