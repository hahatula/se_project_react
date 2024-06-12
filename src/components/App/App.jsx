import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
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
import { setToken, getToken } from '../../utils/token';
import EditProfileModal from '../EditProfileModal/EditProfileModal';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState('F');
  const [weatherData, setWeatherData] = useState({
    type: ' ',
    temperature: { F: 999, C: 999 },
    city: ' ',
  });
  const [modalIsActive, setModalIsActive] = useState(null);
  const [selectedItem, setSelectedItem] = useState({});

  // GETTING INFO ON FIRST LOAD
  // dependencies arrays are empty to turn on these useEffects only once on mount
  useEffect(() => {
    const jwt = getToken();

    if (!jwt) {
      return;
    }

    getUserInfo(jwt)
      .then((user) => {
        // If the response is successful, log the user in and save their data to state
        setIsLoggedIn(true);
        setCurrentUser(user);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getWeather(coordinates, weatherAPIKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getClothes()
      .then((clothes) => {
        setClothingItems(clothes);
      })
      .catch(console.error);
  }, []);

  // HANDLERS
  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === 'F'
      ? setCurrentTemperatureUnit('C')
      : setCurrentTemperatureUnit('F');
  };

  const handleSubmit = (request) => {
    // can use for all form submits
    setIsLoading(true);
    request()
      .then(() => handleActiveModalClose())
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  const handleRegistration = ({ name, avatarUrl, email, password }) => {
    const makeRequest = () => {
      return auth.register(name, avatarUrl, email, password).then(() => {
        handleLogin({ email, password });
      });
    };
    handleSubmit(makeRequest);
  };

  const handleLogin = (formData) => {
    if (!email || !password) {
      return;
    }
    const makeRequest = () => {
      return auth.authorize(formData.email, formData.password).then((data) => {
        if (data.token) {
          setToken(data.token);
          getUserInfo(data.token).then((user) => {
            setCurrentUser(user);
            setIsLoggedIn(true);
            return currentUser;
          });
        }
      });
    };
    handleSubmit(makeRequest);
  };

  const handleEditProfile = (formData) => {
    const makeRequest = () => {
      const user = getToken();
      return editUserInfo(
        {
          name: formData.name,
          avatar: formData.avatarUrl,
        },
        user
      ).then((data) => {
        const { user } = data;
        setCurrentUser((prevUser) => ({
          ...prevUser,
          name: user.name,
          avatar: user.avatar,
        }));
      });
    };
    handleSubmit(makeRequest);
  };

  const handleAddItemSubmit = (formData) => {
    const makeRequest = () => {
      const user = getToken();
      return addClothes(
        {
          name: formData.name,
          imageUrl: formData.imageUrl,
          weather: formData.weather,
        },
        user
      ).then((item) => {
        const newItem = { ...item.data, owner: currentUser };
        setClothingItems([newItem, ...clothingItems]);
      });
    };
    handleSubmit(makeRequest);
  };

  const handleDeleteButton = () => {
    const makeRequest = () => {
      const user = getToken();
      return deleteClothes(selectedItem._id, user).then((res) => {
        //delete from the list
        setClothingItems(
          clothingItems.filter((item) => {
            return item !== selectedItem;
          })
        );
      });
    };
    handleSubmit(makeRequest);
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
            setClothingItems((prevCards) => {
              return prevCards.map((item) =>
                item._id === id ? likedItem : item
              );
            });
            setIsLiked(!isLiked);
          })
          .catch((err) => console.err(err))
      : // if not, send a request to remove the user's id from the card's likes array
        removeCardLike(id, token)
          .then((dislikedItem) => {
            setClothingItems((prevCards) => {
              return prevCards.map((item) =>
                item._id === id ? dislikedItem : item
              );
            });
            setIsLiked(!isLiked);
          })
          .catch((err) => console.err(err));
  };

  // Managing modal windows_____________
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
                isLoading={isLoading}
              />
            )}
            {modalIsActive === 'log-in' && (
              <LoginModal
                onCloseModal={handleActiveModalClose}
                onLogin={handleLogin}
                handleSignUpButton={handleSignUpButton}
                isLoading={isLoading}
              />
            )}
            {modalIsActive === 'edit-profile' && (
              <EditProfileModal
                onCloseModal={handleActiveModalClose}
                onEdit={handleEditProfile}
                isLoading={isLoading}
              />
            )}
            {modalIsActive === 'add-garment' && (
              <AddItemModal
                onCloseModal={handleActiveModalClose}
                onAddItem={handleAddItemSubmit}
                isLoading={isLoading}
              />
            )}
            {modalIsActive === 'preview' && (
              <ItemModal
                name="preview"
                card={selectedItem}
                onClose={handleActiveModalClose}
                onDelete={handleDeleteButton}
                isLoading={isLoading}
              />
            )}
          </CurrentUserContext.Provider>
        </AppContext.Provider>
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
