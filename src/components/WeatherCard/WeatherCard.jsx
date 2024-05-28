import './WeatherCard.css';
import { useContext } from 'react';
import { CurrentTemperatureUnitContext } from '../../contexts/CurrentTemperatureUnitContext';
import WeatherIllustration from '../WeatherIllustration/WeatherIllustration';

function WeatherCard({ weatherData }) {
  const temperature = useContext(CurrentTemperatureUnitContext);
  const temperatureUnit = temperature.currentTemperatureUnit;

  return (
    <section
      className={`weather ${
        weatherData.timeOfTheDay === 'night'
          ? 'weather_night'
          : weatherData.description === 'few clouds' ||
            weatherData.description === 'clear sky'
          ? 'weather_sunny'
          : ''
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
