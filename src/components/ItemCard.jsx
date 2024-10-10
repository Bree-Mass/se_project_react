import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import "../blocks/itemCard.css";

function ItemCard({ item, onCardClick, onCardLike }) {
  const CurrentUser = React.useContext(CurrentUserContext);

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    onCardLike(item);
  };

  return (
    <li className="item-card">
      <div className="item-card__heading">
        <h2 className="item-card__title">{item.name}</h2>
        <button
          className={`item-card__like-button ${
            item.likes.includes(CurrentUser._id)
              ? "item-card__like-button_liked"
              : ""
          }`}
          type="button"
          onClick={handleLike}
        />
      </div>

      <img
        className="item-card__image"
        src={item.imageUrl}
        alt={item.name}
        onClick={handleCardClick}
      />
    </li>
  );
}

export default ItemCard;
