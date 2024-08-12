import { memo } from "react";
import ItemCard from "./ItemCard";
import "../blocks/clothesSection.css";

function ClothesSection({ clothingItems, handleOpen }) {
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
        <ul className="clothes__cards-list">
          {clothingItems.map((item) => (
            <ItemCard key={item._id} item={item} onCardClick={handleOpen} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default memo(ClothesSection);
