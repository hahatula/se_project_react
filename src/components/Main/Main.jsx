import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";

function Main({weatherData}) {
  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <section className="main__clothing">
        <p className="main__text">Today is 75° F / You may want to wear:</p>
        <ul className="main__clithing-items">
            <ItemCard weatherData={weatherData} />
        </ul>
      </section>
    </main>
  );
}

export default Main;
