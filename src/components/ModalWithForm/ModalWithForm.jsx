import './ModalWithForm.css';
import './Form.css';
import { Link } from 'react-router-dom';

function ModalWithForm({
  children,
  title,
  onClose,
  name,
  onSubmit,
}) {
  return (
    <div className={`modal modal_type_${name}`}>
      <div className="modal__form-container">
        <button onClick={onClose} className="modal__close" type="button" />
        <form onSubmit={onSubmit} className="modal__form form">
          <h2 className="form__title">{title}</h2>
          {children}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
