import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import {
  defaultClothingItems,
  coordinates,
  weatherAPIKey,
} from "../../utils/constants";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function App() {
  // Managing weather information_________
  const [weatherData, setWeatherData] = useState({
    type: " ",
    temperature: { F: 999, C: 999 },
    city: " ",
  });

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
    console.log(currentTemperatureUnit);
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

  // Managing modal windows_____________
  const [modalIsActive, setModalIsActive] = useState(null);
  const [selectedItem, setSelectedItem] = useState({});

  const handleActiveModalClose = () => {
    setModalIsActive(null);
  };
  const handleAddButton = () => {
    setModalIsActive("add-garment");
  };
  const handleItemClick = (item) => {
    setModalIsActive("preview");
    setSelectedItem(item);
  };

  // Managing global listeners_________
  useEffect(() => {
    if (!modalIsActive) return; // stop the effect not to add the listener if there is no active modal

    // define the handle functions inside useEffect (not to lose the reference on rerendering) and attach listeners to the doc
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        handleActiveModalClose();
      }
    };
    document.addEventListener("keydown", handleEscClose);

    const handleOverlayClick = (event) => {
      if (event.target.classList.contains("modal")) {
        handleActiveModalClose();
      }
    };
    document.addEventListener("click", handleOverlayClick);

    // clean up functions for removing the listeners
    // Explanation: React will store this function (which is in "return") and call it right before it removes the component from the UI or before re-running the effect due to changes in its dependencies.
    return () => {
      document.removeEventListener("keydown", handleEscClose);
      document.removeEventListener("click", handleOverlayClick);
    };
  }, [modalIsActive]); // fill dependencies array to watch modalIsActive state

  return (
    <div className="app">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="app__container">
          <Header weatherData={weatherData} handleAddButton={handleAddButton} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleItemClick={handleItemClick}
                />
              }
            />
            <Route path="/profile" element={<Profile handleItemClick={handleItemClick} />} />
          </Routes>

          <Footer />
        </div>
        {modalIsActive === "add-garment" && (
          <ModalWithForm
            name="add-garment"
            title="New garment"
            buttonText="Add garment"
            onClose={handleActiveModalClose}
          >
            <label htmlFor="name" className="form__label">
              Name{" "}
              <input
                type="text"
                id="name"
                placeholder="Name"
                className="form__input"
              />
            </label>
            <label htmlFor="image" className="form__label">
              Image{" "}
              <input
                type="url"
                id="image"
                placeholder="Image URL"
                className="form__input"
              />
            </label>
            <fieldset className="form__fieldset">
              <legend className="form__legend">Select the weather type:</legend>
              <div className="form__radio-wrapper">
                <input
                  name="weather"
                  type="radio"
                  id="hot"
                  value="hot"
                  className="form__radio-input"
                />
                <label htmlFor="hot" className="form__radio-label">
                  Hot
                </label>
              </div>
              <div className="form__radio-wrapper">
                <input
                  name="weather"
                  type="radio"
                  id="warm"
                  value="warn"
                  className="form__radio-input"
                />
                <label htmlFor="warm" className="form__radio-label">
                  Warm
                </label>
              </div>
              <div className="form__radio-wrapper">
                <input
                  name="weather"
                  type="radio"
                  id="cold"
                  value="cold"
                  className="form__radio-input"
                />
                <label htmlFor="cold" className="form__radio-label">
                  Cold
                </label>
              </div>
            </fieldset>
          </ModalWithForm>
        )}
        {modalIsActive === "preview" && (
          <ItemModal
            name="preview"
            card={selectedItem}
            onClose={handleActiveModalClose}
          />
        )}
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
