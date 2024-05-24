import { BASE_URL } from "./constants";

export const register = (name, avatar, email, password) => {
    return fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, avatar, email, password }),
    })
      .then((res) => {
        return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
      })
  };
  
  // The authorize function accepts the necessary data as parameters.
  export const authorize = (email, password) => {
      return fetch(`${BASE_URL}/signin`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }).then((res) => {
        return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
      });
    };