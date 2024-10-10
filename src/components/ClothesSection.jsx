import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { ModalContext } from "../contexts/ModalContext";
import ItemCard from "./ItemCard";
import "../blocks/clothesSection.css";

function ClothesSection({ clothingItems, onCardLike, isLoggedIn }) {
  const currentUser = React.useContext(CurrentUserContext);
  const clothesModalContext = React.useContext(ModalContext);

  return (
    <div className="clothes">
      <div className="clothes__header">
        <p className="clothes__header_text">Your items</p>
        <button
          id="add-modal"
          className="clothes__header_button"
          type="button"
          onClick={clothesModalContext.openModals}
        >
          + Add new
        </button>
      </div>
      <div className="clothes__wrapper">
        <ul className="clothes__cards-list">
          {clothingItems
            .filter((item) => item.owner === currentUser._id)
            .map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={clothesModalContext.openModals}
                onCardLike={onCardLike}
                isLoggedIn={isLoggedIn}
              />
            ))}
        </ul>
      </div>
    </div>
  );
}

export default ClothesSection;
