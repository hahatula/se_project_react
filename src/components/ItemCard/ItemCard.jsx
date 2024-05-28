import './ItemCard.css';
import { useContext, useState } from 'react';
import AppContext from '../../contexts/AppContext';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function ItemCard({ card, onItemClick, onCardLike }) {
  const { isLoggedIn } = useContext(AppContext);
  const { currentUser } = useContext(CurrentUserContext);
  const [isLiked, setIsLiked] = useState(card.likes.some((liker) => liker._id === currentUser._id))
  // const isLiked = card.likes.some((liker) => liker._id === currentUser._id);

  const handleCardClick = () => {
    onItemClick(card);
  };
  const handleLike = (e) => {
    onCardLike(e, card._id, isLiked, setIsLiked);
  };

  return (
    <li onClick={handleCardClick} className="item">
      <div className="item__header">
        <h2 className="item__name">{card.name}</h2>
        {isLoggedIn && (
          <button
            onClick={handleLike}
            className={`item__like ${isLiked ? 'item__like_active' : ''}`}
            type='button'
          >
            
          </button>
        )}
      </div>
      <img className="item__img" src={card.imageUrl} alt={card.name} />
    </li>
  );
}

export default ItemCard;
