import { checkResponse, request } from "./api";

export const getWeather = ({ latitude, longitude }, APIkey) => {
  return request(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  );
};

export const filterWeatherData = (data) => {
  const usefulData = {};
  usefulData.city = data.name;
  usefulData.temperature = {
    F: `${Math.round(data.main.temp)}° F`,
    C: `${Math.round((data.main.temp - 32) * (5 / 9))}° C`,
  };
  //Formula	(32°F − 32) × 5/9 = °C

  usefulData.type = weatherType(data.main.temp);
  usefulData.description = data.weather[0].description;
  usefulData.timeOfTheDay = timeOfTheDay(data.sys.sunrise, data.sys.sunset);
  return usefulData;
};

const weatherType = (temperature) => {
  if (temperature > 85) {
    return "hot";
  } else if (temperature >= 66 && temperature <= 85) {
    return "warm";
  } else if (temperature < 66) {
    return "cold";
  }
};

const timeOfTheDay = (sunrise, sunset) => {
  return sunrise < Date.now() / 1000 && Date.now() / 1000 <= sunset
    ? "day"
    : "night";
};
