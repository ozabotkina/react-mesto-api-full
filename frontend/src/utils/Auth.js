import { BASE_URL } from "./constants";


function checkAnswer(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
}


export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: 'include',

    body: JSON.stringify({
      password: password,
      email: email,
    }),
  })
  .then((res) => {
    return checkAnswer(res)})
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      password: password,
      email: email,
    }),
  })
  .then((res) => {
    return checkAnswer(res)})
    .then((data) => {
      // localStorage.setItem("token", data.token);
      return data;
    })
};

export const checkToken = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials:'include',

  })
  .then((res) => {
    return checkAnswer(res)})
    .then((data) => { 
      return data});
};

export const signout = () => {
  return fetch(`${BASE_URL}/signout`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    withCredentials: true,
    credentials: "include",
    })
  .then((res) => {
    return checkAnswer(res)})
    }
