import { useState, useEffect } from 'react';
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Profile from '../Profile/Profile';
import Footer from '../Footer/Footer';
import ItemModal from '../ItemModal/ItemModal';
import { getWeather, filterWeatherData } from '../../utils/weatherApi';
import { coordinates, weatherAPIKey } from '../../utils/constants';
import AppContext from '../../contexts/AppContext';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { CurrentTemperatureUnitContext } from '../../contexts/CurrentTemperatureUnitContext';
import AddItemModal from '../AddItemModal/AddItemModal';
import RegisterModal from '../RegisterModal/RegisterModal';
import LoginModal from '../LoginModal/LoginModal';
import {
  getClothes,
  addClothes,
  deleteClothes,
  getUserInfo,
  editUserInfo,
  addCardLike,
  removeCardLike,
} from '../../utils/api';
import ProtectedRoute from '../PrptectedRoute/ProtectedRoute';
import * as auth from '../../utils/auth';
import { setToken, getToken, removeToken } from '../../utils/token';
import EditProfileModal from '../EditProfileModal/EditProfileModal';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    const jwt = getToken();

    if (!jwt) {
      return;
    }

    getUserInfo(jwt)
      .then((user) => {
        // If the response is successful, log the user in, save their
        // data to state, and navigate them to /ducks.
        setIsLoggedIn(true);
        setCurrentUser(user);
        console.log(currentUser);
      })
      .catch(console.error);
  }, []);

  const handleRegistration = ({ name, avatarUrl, email, password }) => {
    auth
      .register(name, avatarUrl, email, password)
      .then(() => {
        handleLogin({ email, password });
      })
      .catch(console.error);
  };
  const handleLogin = (formData) => {
    console.log(`login: ${formData.email}, ${formData.password}`);
    if (!email || !password) {
      return;
    }
    auth
      .authorize(formData.email, formData.password)
      .then((data) => {
        if (data.token) {
          setToken(data.token);
          getUserInfo(data.token).then((user) => {
            setCurrentUser(user);
            setIsLoggedIn(true);
            setModalIsActive(null);
            return currentUser;
          });
        }
      })
      .catch(console.error);
    console.log('logged in');
  };

  const handleEditProfile = (formData) => {
    const user = getToken();
    editUserInfo(
      {
        name: formData.name,
        imageUrl: formData.imageUrl,
      },
      user
    )
      .then((data) => {
        const { user } = data;
        setCurrentUser((prevUser) => ({
          ...prevUser,
          name: user.name,
          avatar: user.avatar,
        }));
        setModalIsActive(null);
      })
      .catch(console.error);
  };

  // Managing weather information_________
  const [weatherData, setWeatherData] = useState({
    type: ' ',
    temperature: { F: 999, C: 999 },
    city: ' ',
  });

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState('F');
  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === 'F'
      ? setCurrentTemperatureUnit('C')
      : setCurrentTemperatureUnit('F');
  };

  //get weather on load (once)
  useEffect(() => {
    getWeather(coordinates, weatherAPIKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []); // dependencies array is an empty array to turn on this useEffect only once on mount

  //Managing the list of clothes
  const [clothingItems, setClothingItems] = useState([]);
  useEffect(() => {
    getClothes()
      .then((clothes) => {
        setClothingItems(clothes);
      })
      .catch(console.error);
  }, []);

  const handleAddItemSubmit = (formData) => {
    const user = getToken();
    addClothes(
      {
        name: formData.name,
        imageUrl: formData.imageUrl,
        weather: formData.weather,
      },
      user
    )
      .then((item) => {
        const newItem = { ...item.data, owner: currentUser };
        setClothingItems([newItem, ...clothingItems]);
        handleActiveModalClose();
      })
      .catch(console.error);
  };

  const handleDeleteButton = () => {
    const user = getToken();
    deleteClothes(selectedItem._id, user)
      .then((res) => {
        //delete from the list
        setClothingItems(
          clothingItems.filter((item) => {
            return item !== selectedItem;
          })
        );
        handleActiveModalClose();
      })
      .catch(console.error);
  };

  const handleCardLike = (event, id, isLiked, setIsLiked) => {
    event.stopPropagation();
    const token = getToken('jwt');
    // Check if this card is not currently liked
    !isLiked
      ? // if so, send a request to add the user's id to the card's likes array
        // the first argument is the card's id
        addCardLike(id, token)
          .then((likedItem) => {
            console.log(`liked: ${likedItem}`);
            console.log(clothingItems);
            setClothingItems((prevCards) => {
              return prevCards.map((item) =>
                item._id === id ? likedItem : item
              );
            });
            console.log(clothingItems);
            setIsLiked(!isLiked);
          })
          .catch((err) => console.log(err))
      : // if not, send a request to remove the user's id from the card's likes array
        removeCardLike(id, token)
          .then((dislikedItem) => {
            console.log(`disliked ${dislikedItem}`);
            console.log(clothingItems);
            setClothingItems((prevCards) => {
             return prevCards.map((item) => (item._id === id ? dislikedItem : item));
            });
            setIsLiked(!isLiked);
          })
          .catch((err) => console.log(err));
  };

  // Managing modal windows_____________
  const [modalIsActive, setModalIsActive] = useState(null);
  const [selectedItem, setSelectedItem] = useState({});

  const handleActiveModalClose = () => {
    setModalIsActive(null);
  };
  const handleAddButton = () => {
    setModalIsActive('add-garment');
  };
  const handleItemClick = (item) => {
    setModalIsActive('preview');
    setSelectedItem(item);
  };
  const handleLogInButton = () => {
    setModalIsActive('log-in');
  };
  const handleSignUpButton = () => {
    setModalIsActive('register');
  };
  const handleEditProfileButton = () => {
    setModalIsActive('edit-profile');
  };

  // Managing global listeners_________
  useEffect(() => {
    if (!modalIsActive) return; // stop the effect not to add the listener if there is no active modal

    // define the handle functions inside useEffect (not to lose the reference on rerendering) and attach listeners to the doc
    const handleEscClose = (e) => {
      if (e.key === 'Escape') {
        handleActiveModalClose();
      }
    };
    document.addEventListener('keydown', handleEscClose);

    const handleOverlayClick = (event) => {
      if (event.target.classList.contains('modal')) {
        handleActiveModalClose();
      }
    };
    document.addEventListener('click', handleOverlayClick);

    // clean up functions for removing the listeners
    // Explanation: React will store this function (which is in "return") and call it right before it removes the component from the UI or before re-running the effect due to changes in its dependencies.
    return () => {
      document.removeEventListener('keydown', handleEscClose);
      document.removeEventListener('click', handleOverlayClick);
    };
  }, [modalIsActive]); // fill dependencies array to watch modalIsActive state

  return (
    <div className="app">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
          <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
            <div className="app__container">
              <Header
                weatherData={weatherData}
                handleAddButton={handleAddButton}
                handleLogInButton={handleLogInButton}
                handleSignUpButton={handleSignUpButton}
              />
              <Routes>
                <Route
                  path="/"
                  element={
                    <Main
                      weatherData={weatherData}
                      handleItemClick={handleItemClick}
                      clothingItems={clothingItems}
                      onCardLike={handleCardLike}
                    />
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile
                        handleItemClick={handleItemClick}
                        clothingItems={clothingItems}
                        handleAddButton={handleAddButton}
                        handleEditProfileButton={handleEditProfileButton}
                        onCardLike={handleCardLike}
                      />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>

              <Footer />
            </div>
            {modalIsActive === 'register' && (
              <RegisterModal
                onCloseModal={handleActiveModalClose}
                onRegister={handleRegistration}
                handleLogInButton={handleLogInButton}
              />
            )}
            {modalIsActive === 'log-in' && (
              <LoginModal
                onCloseModal={handleActiveModalClose}
                onLogin={handleLogin}
                handleSignUpButton={handleSignUpButton}
              />
            )}
            {modalIsActive === 'edit-profile' && (
              <EditProfileModal
                onCloseModal={handleActiveModalClose}
                onEdit={handleEditProfile}
              />
            )}
            {modalIsActive === 'add-garment' && (
              <AddItemModal
                onCloseModal={handleActiveModalClose}
                onAddItem={handleAddItemSubmit}
              />
            )}
            {modalIsActive === 'preview' && (
              <ItemModal
                name="preview"
                card={selectedItem}
                onClose={handleActiveModalClose}
                onDelete={handleDeleteButton}
              />
            )}
          </CurrentUserContext.Provider>
        </AppContext.Provider>
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
