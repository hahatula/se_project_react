const baseUrl = "http://localhost:3001";

const checkResponse = (res) => {
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
