import './Form.css';

function Form({ onSubmit, title, children }) {
  return (
    <form onSubmit={onSubmit} className="modal__form form">
      <h2 className="form__title">{title}</h2>
      {children}
    </form>
  );
}

export default Form;
