import { useState } from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';

function RegisterModal({ onCloseModal, onRegister, handleLogInButton }) {
  const [data, setData] = useState({
    name: '',
    avatarUrl: '',
    email: '',
    password: '',
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
    onRegister(data);
  };

  return (
    <ModalWithForm
      name="register"
      title="Sign Up"
      onClose={onCloseModal}
      onSubmit={handleSubmit}
    >
      <label htmlFor="email" className="form__label">
        Email*
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
          className="form__input"
        />
      </label>
      <label htmlFor="password" className="form__label">
        Password*
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={data.password}
          onChange={handleChange}
          className="form__input"
        />
      </label>
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
          Sign Up
        </button>
        <button className="form__alt-option" onClick={handleLogInButton}>
          or Log In
        </button>
      </div>
    </ModalWithForm>
  );
}

export default RegisterModal;
