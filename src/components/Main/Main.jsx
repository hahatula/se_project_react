import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants";

function Main({ weatherData }) {
  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <section className="main__clothing">
        <p className="main__text">
          Today is {weatherData.temperature.F} / You may want to wear:
        </p>
        <ul className="main__items">
          {defaultClothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => (
              <ItemCard key={item._id} name={item.name} link={item.link} />
            ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
