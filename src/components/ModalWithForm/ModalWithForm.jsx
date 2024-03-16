import "./ModalWithForm.css";
import "./Form.css";

function ModalWithForm({ children, title, buttonText, handleClose, name }) {
  return (
    <div className={`modal modal_type_${name}`}>
      <div className="modal__form-container">
        <button
          onClick={handleClose}
          className="modal__close"
          type="button"
        ></button>
        <form className="modal__form form">
          <h2 className="form__title">{title}</h2>
          {children}

          <button className="form__submit" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
