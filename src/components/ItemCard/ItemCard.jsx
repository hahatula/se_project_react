import "./ItemCard.css";

function ItemCard({name, link}) {
  return (
    <>
      <h2 className="item-name">{name}</h2>
      <img src={link} alt="" />
    </>
  );
}

export default ItemCard;
