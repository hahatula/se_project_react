import { useState } from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';

function LoginModal({ onCloseModal, onLogin, handleSignUpButton }) {
  const [data, setData] = useState({
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
    onLogin(data);
  };

  return (
    <ModalWithForm
      name="login"
      title="Log In"
      onClose={onCloseModal}
      onSubmit={handleSubmit}
    >
      <label htmlFor="email" className="form__label">
        Email
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
        Password
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
      <div className="form__buttons">
        <button className="form__submit" type="submit">
          Log In
        </button>
        <button
          className="form__alt-option"
          onClick={handleSignUpButton}
          type="button"
        >
          or Sign Up
        </button>
      </div>
    </ModalWithForm>
  );
}

export default LoginModal;
