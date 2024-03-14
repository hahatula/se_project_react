export const getWeather = ({ latitude, longitude }, APIkey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  });
};

export const filterWeatherData = (data) => {
  const usefulData = {};
  usefulData.city = data.name;
  usefulData.temperature = {
    F: `${data.main.temp}° F`,
    C: `${(data.main.temp - 32)*(5/9)}° C`,
  };
  //Formula	(32°F − 32) × 5/9 = °C

  usefulData.type = "ok";

  return usefulData;
};
