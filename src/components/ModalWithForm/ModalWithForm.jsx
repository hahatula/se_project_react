import './ModalWithForm.css';
import './Form.css';
import { Link } from 'react-router-dom';

function ModalWithForm({
  children,
  title,
  buttonText,
  onClose,
  name,
  onSubmit,
  altLink,
}) {
  return (
    <div className={`modal modal_type_${name}`}>
      <div className="modal__form-container">
        <button onClick={onClose} className="modal__close" type="button" />
        <form onSubmit={onSubmit} className="modal__form form">
          <h2 className="form__title">{title}</h2>
          {children}
          <div className="form__buttons">
            <button className="form__submit" type="submit">
              {buttonText}
            </button>
            {altLink && <Link className="form__alt-option">{altLink}</Link>}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
