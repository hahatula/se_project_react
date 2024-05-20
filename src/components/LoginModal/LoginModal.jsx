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
      buttonText="Log In"
      onClose={onCloseModal}
      //   onSubmit={handleSubmit}
      altLink="or Sign Up"
    >
      <label htmlFor="name" className="form__label">
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
      <label htmlFor="name" className="form__label">
        Password
        <input
          type="text"
          id="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          className="form__input"
        />
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
