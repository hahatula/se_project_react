import ItemCard from '../ItemCard/ItemCard';
import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function ClothesSection({ handleItemClick, clothingItems, handleAddButton }) {
  const currentUser = useContext(CurrentUserContext);
  
  return (
    <div>
      <div className="profile__header">
        Your items
        <button
          onClick={handleAddButton}
          type="button"
          className="header__btn profile__add-btn"
        >
          + Add new
        </button>
      </div>
      <ul className="main__items">
        {clothingItems
          .filter((item) => {
            return item.owner._id === currentUser._id;
          })
          .map((item) => (
            <ItemCard
              key={item._id}
              card={item}
              onItemClick={handleItemClick}
            />
          ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
