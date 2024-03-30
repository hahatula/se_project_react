import "./ItemModal.css";

function ItemModal({ name, card, onClose, onDelete }) {
const handleDelete = () => { 
  onDelete();
}

  return (
    <div className={`modal modal_type_${name}`}>
      <div className="modal__item-container">
        <button onClick={onClose} className="modal__close" type="button" />
        <img className="modal__preiew-image" src={card.imageUrl} alt={card.name} />
        <div className="modal__info-wrapper">
          <div className="modal__preview-info">
            <h2 className="modal__item-name">{card.name}</h2>
            <p>Weather: {card.weather}</p>
          </div>
          <button onClick={handleDelete} type="button" className="modal__delete-btn">Delete item</button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
