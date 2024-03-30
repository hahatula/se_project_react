import "./WeatherCard.css";
import { useContext } from "react";
import cloudImg from "../../assets/cloud-img.svg";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import WeatherIllustration from "../WeatherIllustration/WeatherIllustration";

function WeatherCard({ weatherData }) {
  const temperature = useContext(CurrentTemperatureUnitContext);
  const temperatureUnit = temperature.currentTemperatureUnit;
  //console.log(weatherData.temperature.temperatureUnit); // why undefined? Here temperatureUnit is literally a key named "temperatureUnit" and I don't have such key.
  //console.log(weatherData.temperature[temperatureUnit]); // why ok? Here temperatureUnit is dynamic and equals weatherData.temperature["F"] or weatherData.temperature["C"].

  return (
    <section
      className={`weather ${
        weatherData.timeOfTheDay === "night"
          ? "weather_night"
          : weatherData.description === "few clouds" ||
            weatherData.description === "clear sky"
          ? "weather_sunny"
          : ""
      }`}
    >
      <p className="weather__value">
        {weatherData.temperature[temperatureUnit]}
      </p>
      <WeatherIllustration weatherData={weatherData} />
    </section>
  );
}

export default WeatherCard;
