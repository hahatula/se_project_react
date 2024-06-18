import { BASE_URL } from './constants';

export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

export const request = (url, options) => {
  return fetch(url, options).then(checkResponse);
};

export const getClothes = () => {
  return request(`${BASE_URL}` + `/items`).then((clothes) => {
    return clothes.data;
  });
};

export const addClothes = ({ name, imageUrl, weather }, token) => {
  return request(`${BASE_URL}` + `/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: name,
      imageUrl: imageUrl,
      weather: weather,
    }),
  }).then((newItem) => {
    return newItem;
  });
};

export const deleteClothes = (id, token) => {
  return request(`${BASE_URL}` + `/items/` + `${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getUserInfo = (token) => {
  // Send a GET request to /users/me
  return request(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      // Specify an authorization header with an appropriately
      // formatted value.
      Authorization: `Bearer ${token}`,
    },
  });
};

export const editUserInfo = ({ name, avatar, city, coordinates }, token) => {
  return request(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: name,
      avatar: avatar,
      city: city,
      coordinates: coordinates,
    }),
  });
};

export const addCardLike = (id, token) => {
  return request(`${BASE_URL}` + `/items/` + `${id}` + `/likes/`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((likedItem) => {
    return likedItem.data;
  });
};

export const removeCardLike = (id, token) => {
  return request(`${BASE_URL}` + `/items/` + `${id}` + `/likes/`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((dislikedItem) => {
    return dislikedItem.data;
  });
};
