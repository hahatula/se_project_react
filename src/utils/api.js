import { baseUrl } from "./constants";

export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

export const getClothes = () => {
  return fetch(`${baseUrl}` + `/items`)
    .then(checkResponse)
    .then((clothes) => {
      return clothes;
    });
};

export const addClothes = ({ name, imageUrl, weather }) => {
  return fetch(`${baseUrl}` + `/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      imageUrl: imageUrl,
      weather: weather,
    }),
  })
    .then(checkResponse)
    .then((newItem) => {
      return newItem;
    });
};

export const deleteClothes = (id) => {
  return fetch(`${baseUrl}` + `/items/` + `${id}`, {
    method: "DELETE",
  }).then(checkResponse);
};
