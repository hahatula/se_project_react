import { useState } from 'react';
import { Link } from 'react-router-dom';
import ModalWithForm from '../ModalWithForm/ModalWithForm';

function RegisterModal({ onCloseModal, onRegister }) {
  const [email, setEmail] = useState('');
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const [password, setPassword] = useState('');
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const [name, setName] = useState('');
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const [avatarUrl, setAvatarUrl] = useState('');
  const handleAvatarUrl = (e) => {
    setAvatarUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister();
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
          type="text"
          id="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
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
          value={password}
          onChange={handlePasswordChange}
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
          value={name}
          onChange={handleNameChange}
          className="form__input"
        />
      </label>
      <label htmlFor="avatar" className="form__label">
        Avatar URL*
        <input
          type="url"
          id="avatar"
          name="avatarUrl"
          placeholder="Avatar URL"
          value={avatarUrl}
          onChange={handleAvatarUrl}
          className="form__input"
        />
      </label>
      <div className="form__buttons">
        <button className="form__submit" type="submit">
          Sign Up
        </button>
        <Link className="form__alt-option">or Log In</Link>
      </div>
    </ModalWithForm>
  );
}

export default RegisterModal;
