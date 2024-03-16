import { useState, useEffect } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import {
  defaultClothingItems,
  coordinates,
  weatherAPIKey,
} from "../../utils/constants";

function App() {
  // Managing weather information_________
  const [weatherData, setWeatherData] = useState({
    type: " ",
    temperature: { F: 999, C: 999 },
    city: " ",
  });
  //get weather on load (once)
  useEffect(() => {
    getWeather(coordinates, weatherAPIKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error());
  }, []);

  // Managing modal windows_____________
  const [modalIsActive, setModalIsActive] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});

  const handleActiveModalClose = () => {
    setModalIsActive(false);
  };
  const handleAddButton = () => {
    setModalIsActive("add-garment");
  };
  const handleItemClick = (item) => {
    setModalIsActive("preview");
    setSelectedItem(item);
  };

  return (
    <div className="app">
      <div className="app__container">
        <Header weatherData={weatherData} handleAddButton={handleAddButton} />
        <Main weatherData={weatherData} handleItemClick={handleItemClick} />
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
    </div>
  );
}

export default App;
