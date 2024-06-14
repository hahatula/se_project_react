import './Header.css';
import './burger.css';
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import AppContext from '../../contexts/AppContext';

function Header({
  weatherData,
  handleAddButton,
  handleLogInButton,
  handleSignUpButton,
}) {
  const { isLoggedIn } = useContext(AppContext);
  const { currentUser } = useContext(CurrentUserContext);
  const currentDate = new Date().toLocaleString('default', {
    month: 'long',
    day: 'numeric',
  });

  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpened(!isMobileMenuOpened);
  };

  const mobileMenuHandler = () => {
    toggleMobileMenu();
  };

  return (
    <header className="header">
      <div className="header__info">
        <Link to="/" className="header__link">
          <img className="header__logo" src={logo} alt="Logo" />
        </Link>

        <p className="header__data-and-geo">
          {currentDate}, {isLoggedIn ? currentUser.city : 'Tel Aviv'}
        </p>
      </div>
      <div
        className={`header__user-tools ${
          isMobileMenuOpened
            ? 'header__user-tools_opened'
            : 'header__user-tools_closed'
        }`}
      >
        <div
          onClick={mobileMenuHandler}
          className={`header__mobile-menu-icon ${
            isMobileMenuOpened ? 'burger burger-opened' : 'burger'
          }`}
        >
          <div className="burger__element burger__element_type_top" />
          <div className="burger__element burger__element_type_bottom" />
        </div>
        <ToggleSwitch />
        {isLoggedIn ? (
          <>
            <button
              onClick={handleAddButton}
              type="button"
              className="header__btn"
            >
              + Add clothes
            </button>
            <Link to="/profile" className="header__link">
              <div className="header__user">
                <p className="header__user-name">{currentUser.name}</p>
                {currentUser.avatar ? (
                  <img
                    className="header__user-avatar"
                    src={currentUser.avatar}
                    alt="Aratar"
                  />
                ) : (
                  <p className="header__user-avatar">
                    {currentUser.name[0].toUpperCase()}
                  </p>
                )}
              </div>
            </Link>
          </>
        ) : (
          <>
            <button
              className="header__btn"
              onClick={handleSignUpButton}
              type="button"
            >
              Sign Up
            </button>
            <button
              className="header__btn"
              onClick={handleLogInButton}
              type="button"
            >
              Log In
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
