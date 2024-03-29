import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ handleItemClick, clothingItems, handleAddButton }) {
  return (
    <div>
      <div className="profile__header">
        Your items
        <button
          onClick={handleAddButton}
          type="button"
          className="header__add-btn profile__add-btn"
        >
          + Add new
        </button>
      </div>
      <ul className="main__items">
        {clothingItems.map((item) => (
          <ItemCard key={item._id} card={item} onItemClick={handleItemClick} />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
