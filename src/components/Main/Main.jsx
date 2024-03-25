import "./Main.css";
import { useContext } from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function Main({ weatherData, handleItemClick }) {
  const temperature = useContext(CurrentTemperatureUnitContext);
  const temperatureUnit = temperature.currentTemperatureUnit;

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <section className="main__clothing">
        <p className="main__text">
          Today is {weatherData.temperature[temperatureUnit]} / You may want to wear:
        </p>
        <ul className="main__items">
          {defaultClothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => (
              <ItemCard
                key={item._id}
                card={item}
                onItemClick={handleItemClick}
              />
            ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
