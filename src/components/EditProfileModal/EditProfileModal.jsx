import { useState, useContext } from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function EditProfileModal({ onCloseModal, onEdit }) {
  const { currentUser } = useContext(CurrentUserContext);
  const [data, setData] = useState({
    name: `${currentUser.name}`,
    avatarUrl: `${currentUser.avatar}`,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit(data);
  };

  return (
    <ModalWithForm
      name="edit-profile"
      title="Change profile data"
      onClose={onCloseModal}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="form__label">
        Name*
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          value={data.name}
          onChange={handleChange}
          className="form__input"
          minLength={2}
        />
      </label>
      <label htmlFor="avatar" className="form__label">
        Avatar URL*
        <input
          type="url"
          id="avatar"
          name="avatarUrl"
          placeholder="Avatar URL"
          value={data.avatarUrl}
          onChange={handleChange}
          className="form__input"
        />
      </label>
      <div className="form__buttons">
        <button className="form__submit" type="submit">
          Save changes
        </button>
      </div>
    </ModalWithForm>
  );
}

export default EditProfileModal;
