import { useState } from 'react';
import { Link } from 'react-router-dom';
import ModalWithForm from '../ModalWithForm/ModalWithForm';

function LoginModal({ onCloseModal }) {
  const [email, setEmail] = useState('');
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const [password, setPassword] = useState('');
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // onAddItem({ name, imageUrl, weather }); add handler
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
        Password
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
      <div className="form__buttons">
        <button className="form__submit" type="submit">
          Log In
        </button>
        <Link className="form__alt-option">or Sign Up</Link>
      </div>
    </ModalWithForm>
  );
}

export default LoginModal;
