import { BASE_URL } from './constants';
import { request } from './api';

export const register = (name, avatar, email, password, city, coordinates) => {
  return request(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, avatar, email, password, city, coordinates }),
  });
};

// The authorize function accepts the necessary data as parameters.
export const authorize = (email, password) => {
  return request(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
};
