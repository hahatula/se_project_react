import "./ItemCard.css";

function ItemCard({ id, name, link }) {
  return (
    <li className="item" key={id}>
      <h2 className="item-name">{name}</h2>
      <img className="item-img" src={link} alt="" />
    </li>
  );
}

export default ItemCard;
