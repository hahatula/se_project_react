import './ModalWithForm.css';
import { Modal } from '../Modal/Modal';
import Form from '../Form/Form';

function ModalWithForm({ children, title, onClose, name, onSubmit }) {
  return (
    <Modal name={name} onClose={onClose}>
      <div className="modal__form-container">
        <Form title={title} onSubmit={onSubmit}>{children}</Form>
      </div>
    </Modal>
  );
}

export default ModalWithForm;
