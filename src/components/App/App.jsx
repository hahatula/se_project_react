import { useState, useEffect } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
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
    })
  //get weather on load (once)
  useEffect(() => {
    getWeather(coordinates, weatherAPIKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error());
  }, []);

  return (
    <div className="app">
      <div className="app__container">
        <Header weatherData={weatherData} />
        <Main weatherData={weatherData} />
        <Footer />
      </div>
    </div>
  );
}

export default App;
