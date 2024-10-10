import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import "../blocks/itemCard.css";

function ItemCard({ item, onCardClick, onCardLike, isLoggedIn }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isLiked = item.likes?.some((id) => id === currentUser._id);

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
        {isLoggedIn ? (
          <button
            className={`item-card__like-button ${
              isLiked ? "item-card__like-button_liked" : ""
            }`}
            type="button"
            onClick={handleLike}
          />
        ) : null}
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
