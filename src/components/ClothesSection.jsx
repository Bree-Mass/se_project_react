import { memo } from "react";
import "../blocks/clothesSection.css";

function ClothesSection({ clothingItems, renderCards, handleOpen }) {
  return (
    <div className="clothes">
      <div className="clothes__header">
        <p className="clothes__header_text">Your items</p>
        <button
          id="add-modal"
          className="clothes__header_button"
          type="button"
          onClick={handleOpen}
        >
          + Add new
        </button>
      </div>
      <div className="clothes__wrapper">
        <ul className="clothes__cards-list">{renderCards(clothingItems)}</ul>
      </div>
    </div>
  );
}

export default memo(ClothesSection);
