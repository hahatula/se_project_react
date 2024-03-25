import "./WeatherCard.css";
import { useContext } from "react";
import cloudImg from "../../assets/cloud-img.svg";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function WeatherCard({ weatherData }) {
  const temperature = useContext(CurrentTemperatureUnitContext);
  const temperatureUnit = temperature.currentTemperatureUnit;
  console.log(weatherData.temperature.temperatureUnit); // why undefined?
  console.log(weatherData.temperature[temperatureUnit]); // why ok?

  return (
    <section className="weather">
      <p className="weather__value">
        {weatherData.temperature[temperatureUnit]}
      </p>
      <span className="weather__illustration weather__illustration_type_sun"></span>
      <img
        className="weather__illustration weather__illustration_type_cloud"
        src={cloudImg}
        alt="Cloud illustartion"
      />
    </section>
  );
}

export default WeatherCard;
