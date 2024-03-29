import "./ItemCard.css";

function ItemCard({ card, onItemClick }) {
  const handleCardClick = () => {
    onItemClick(card);
  };
  return (
    <li onClick={handleCardClick} className="item">
      <h2 className="item__name">{card.name}</h2>
      <img className="item__img" src={card.imageUrl} alt={card.name} />
    </li>
  );
}

export default ItemCard;
