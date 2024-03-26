import "./WeatherIllustration.css";
import cloudImg from "../../assets/cloud-img.svg";
import rainImg from "../../assets/rain.svg";
import snowImg from "../../assets/snow.svg";
import thunderImg from "../../assets/thunder.svg";

function WeatherIllustration({ weatherData }) {
  console.log(weatherData.timeOfTheDay);
  console.log(weatherData.description);
  const showLuminary = ["few clouds", "clear sky"];
  const showCloud = ["few clouds", "scattered clouds", "broken clouds"];
  const showPrecipitation = ["shower rain", "rain", "thunderstorm", "snow"];

  return (
    <>
      {showLuminary.includes(weatherData.description) && (
        <span
          className={`luminary ${
            weatherData.timeOfTheDay === "night"
              ? "luminary_type_moon"
              : "luminary_type_sun"
          }`}
        ></span>
      )}
      {showCloud.includes(weatherData.description) && (
        <img
          className={`low-cloud cloud_${weatherData.timeOfTheDay}`}
          src={cloudImg}
          alt="Cloud illustartion"
        />
      )}
      {showPrecipitation.includes(weatherData.description) && (
        <>
          {weatherData.description === "thunderstorm" && (
            <img
              className={`rain-shower`}
              src={thunderImg}
              alt="Rain illustartion"
            />
          )}
          <img
            className={`high-cloud cloud_${
              weatherData.description === "snow" ? "snowy" : "rainy"
            }-${weatherData.timeOfTheDay}`}
            src={cloudImg}
            alt="Cloud illustartion"
          />
          {weatherData.description === "snow" ? (
            <img className={`snow`} src={snowImg} alt="Snow illustartion" />
          ) : (
            <img className={`rain`} src={rainImg} alt="Rain illustartion" />
          )}
        </>
      )}
      {weatherData.description === "mist" && (
        <>
          <img
            className={`low-cloud-mist cloud_${weatherData.timeOfTheDay}-mist`}
            src={cloudImg}
            alt="Cloud illustartion"
          />
          <img
            className={`high-cloud-mist cloud_${weatherData.timeOfTheDay}-mist`}
            src={cloudImg}
            alt="Cloud illustartion"
          />
        </>
      )}
    </>
  );
}

export default WeatherIllustration;
