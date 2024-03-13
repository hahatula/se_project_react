import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar-placeholder.svg"

function Header() {
  return ((
    <header className="header">
      <div className="header__info">
        <img className="header__logo" src={logo} alt="Logo" />
        <p className="header__data-and-geo">June 15, New York</p>
      </div>
      <div className="header__user-tools">
        <button className="header__add-btn">+ Add clothes</button>
        <div className="header__user">
          <p className="header__user-name">Terrence Tegegne</p>
          <img className="header__user-avatar" src={avatar} alt="Aratar" />
        </div>
      </div>
    </header>
  ));
}

export default Header;
