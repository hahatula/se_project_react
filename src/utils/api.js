import { baseUrl } from "./constants";

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
  return request(`${baseUrl}` + `/items`).then((clothes) => {
    return clothes;
  });
};

export const addClothes = ({ name, imageUrl, weather }) => {
  return request(`${baseUrl}` + `/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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
  return request(`${baseUrl}` + `/items/` + `${id}`, {
    method: "DELETE",
  });
};
