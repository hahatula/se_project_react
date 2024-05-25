import avatar from '../../assets/avatar-placeholder.svg';
import { useNavigate } from 'react-router-dom';
import { removeToken } from '../../utils/token';
import { useContext } from 'react';
import AppContext from '../../contexts/AppContext';

function SideBar() {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AppContext);

  function logOut() {
    removeToken();
    navigate('/');
    setIsLoggedIn(false);
  }

  return (
    <div className="profile__sidebar">
      <div className="profile__user">
        <img className="profile__user-avatar" src={avatar} alt="Aratar" />
        <p className="profile__user-name">Terrence Tegegne</p>
      </div>
      <button className="profile__btn">Change profile data</button>
      <button onClick={logOut} className="profile__btn">
        Log out
      </button>
    </div>
  );
}

export default SideBar;
