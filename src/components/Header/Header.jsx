import "./Header.css";
import "./burger.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar-placeholder.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({ weatherData, handleAddButton }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpened(!isMobileMenuOpened);
  };

  const mobileMenuHandler = () => {
    console.log("clicked");
    toggleMobileMenu();
  };

  // Managing toggle_________
  // const [checked, setChecked] = useState(false);
  // const handleChange = () => {
  //   setChecked(!checked);
  //   console.log(checked);
  // };

  return (
    <header className="header">
      <div className="header__info">
        <Link to="/" className="header__link">
          <img className="header__logo" src={logo} alt="Logo" />
        </Link>

        <p className="header__data-and-geo">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <div
        className={`header__user-tools ${
          isMobileMenuOpened
            ? "header__user-tools_opened"
            : "header__user-tools_closed"
        }`}
      >
        <div
          onClick={mobileMenuHandler}
          className={`header__mobile-menu-icon ${
            isMobileMenuOpened ? "burger burger-opened" : "burger"
          }`}
        >
          <div className="burger__element burger__element_type_top" />
          <div className="burger__element burger__element_type_bottom" />
        </div>
        <ToggleSwitch />
        <button
          onClick={handleAddButton}
          type="button"
          className="header__add-btn"
        >
          + Add clothes
        </button>
        <Link to="/profile" className="header__link">
          <div className="header__user">
            <p className="header__user-name">Terrence Tegegne</p>
            <img className="header__user-avatar" src={avatar} alt="Aratar" />
          </div>
        </Link>
      </div>
    </header>
  );
}

export default Header;
