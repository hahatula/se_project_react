import { useState, useEffect } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import {
  defaultClothingItems,
  coordinates,
  weatherAPIKey,
} from "../../utils/constants";

function App() {
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

  let modalIsOpened = true;

  return (
    <div className="app">
      <div className="app__container">
        <Header weatherData={weatherData} />
        <Main weatherData={weatherData} />
        <Footer />
      </div>
      {modalIsOpened && (
        <ModalWithForm title="New garment" buttonText="Add garment">
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
    </div>
  );
}

export default App;
