import { request } from './api';

export const getCoordinates = (city, APIkey) => {
  return request(
    `https://api.opencagedata.com/geocode/v1/json?q=${city}&language=en&key=${APIkey}`
  );
};
