import './ItemModal.css';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { useContext } from 'react';
import { Modal } from '../Modal/Modal';

function ItemModal({ name, card, onClose, onDelete, isLoading }) {
  const { currentUser } = useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;

  const handleDelete = () => {
    onDelete();
  };

  return (
    <Modal name={name} onClose={onClose}>
      <div className="modal__item-container">
        <img
          className="modal__preiew-image"
          src={card.imageUrl}
          alt={card.name}
        />
        <div className="modal__info-wrapper">
          <div className="modal__preview-info">
            <h2 className="modal__item-name">{card.name}</h2>
            <p>Weather: {card.weather}</p>
          </div>
          {isOwn && (
            <button
              onClick={handleDelete}
              type="button"
              className="modal__delete-btn"
            >
              {isLoading ? 'Deleting...' : 'Delete item'}
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default ItemModal;
