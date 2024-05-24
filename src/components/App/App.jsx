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
import { CurrentTemperatureUnitContext } from '../../contexts/CurrentTemperatureUnitContext';
import AddItemModal from '../AddItemModal/AddItemModal';
import RegisterModal from '../RegisterModal/RegisterModal';
import LoginModal from '../LoginModal/LoginModal';
import { getClothes, addClothes, deleteClothes } from '../../utils/api';
import AppContext from '../../contexts/AppContext';
import ProtectedRoute from '../PrptectedRoute/ProtectedRoute';
import * as auth from '../../utils/auth';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();

  const handleRegistration = ({ name, avatarUrl, email, password }) => {
    console.log(`reg: ${name},  ${avatarUrl}, ${email}, ${password}`);
    auth.register(name, avatarUrl, email, password).then(() => {
      auth.authorize({ email, password }).catch(console.error);
    });
  };
  const handleLogin = (formData) => {
    console.log(`login: ${formData.email}, ${formData.password}`);
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
    addClothes(formData)
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
        handleActiveModalClose();
      })
      .catch(console.error);
  };

  const handleDeleteButton = () => {
    deleteClothes(selectedItem._id)
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
          <div className="app__container">
            <Header
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
              handleAddButton={handleAddButton}
              handleLogInButton={handleLogInButton}
              handleSignUpButton={handleSignUpButton}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute anonymous>
                    <Main
                      weatherData={weatherData}
                      handleItemClick={handleItemClick}
                      clothingItems={clothingItems}
                    />
                  </ProtectedRoute>
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
        </AppContext.Provider>
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
