import "./ModalWithForm.css";
import "./Form.css";

function ModalWithForm({ children, title, buttonText }) {
  return (
    <div className="modal">
      <div className="modal__form-container">
        <button className="modal__close" type="button"></button>
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
