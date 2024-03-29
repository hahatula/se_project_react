import "./ModalWithForm.css";
import "./Form.css";

function ModalWithForm({ children, title, buttonText, onClose, name, onSubmit }) {
  return (
    <div className={`modal modal_type_${name}`}>
      <div className="modal__form-container">
        <button onClick={onClose} className="modal__close" type="button" />
        <form onSubmit={onSubmit} className="modal__form form">
          <h2 className="form__title">{title}</h2>
          {children}
          <button className="form__submit" type="submit" >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
