import "./itemCard.css";

function ItemCard({ item, onCardClick }) {
  const handleCardClick = () => {
    onCardClick(item);
  };

  return (
    <li className="item-card">
      <h2 className="item-card__heading">{item.name}</h2>
      <img
        className="item-card__image"
        src={item.link}
        alt={item.name}
        onClick={handleCardClick}
      />
      {/* <p className="item-card__weather">{item.weather}</p> */}
    </li>
  );
}

export default ItemCard;
