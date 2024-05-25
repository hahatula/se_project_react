import { BASE_URL } from "./constants";

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
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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

export const deleteClothes = (id) => {
  return request(`${BASE_URL}` + `/items/` + `${id}`, {
    method: "DELETE",
  });
};

// getContent accepts the token as an argument.
export const getUserInfo = (token) => {
  // Send a GET request to /users/me
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // Specify an authorization header with an appropriately
      // formatted value.
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
}