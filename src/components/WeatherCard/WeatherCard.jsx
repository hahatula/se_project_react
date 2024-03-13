import "./WeatherCard.css";
import cloudImg from "../../assets/cloud-img.svg";

function WeatherCard() {
  return (
    <section className="weather">
      <p className="weather__value">75</p>
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
