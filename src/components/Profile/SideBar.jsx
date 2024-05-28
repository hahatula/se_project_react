import { useNavigate } from 'react-router-dom';
import { removeToken } from '../../utils/token';
import { useContext } from 'react';
import AppContext from '../../contexts/AppContext';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function SideBar({ handleEditProfileButton }) {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AppContext);
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  function logOut() {
    removeToken();
    navigate('/');
    setIsLoggedIn(false);
    setCurrentUser({});
  }

  return (
    <div className="profile__sidebar">
      <div className="profile__user">
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
        <p className="profile__user-name">{currentUser.name}</p>
      </div>
      <button className="profile__btn" onClick={handleEditProfileButton} type='button'>Change profile data</button>
      <button onClick={logOut} className="profile__btn" type='button'>
        Log out
      </button>
    </div>
  );
}

export default SideBar;
