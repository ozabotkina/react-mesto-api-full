import { BASE_URL } from "./constants";

class API {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkAnswer(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  fetchInitialData() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      credentials: 'include',
      headers: this._headers,
    }).then((res) => {
      return this._checkAnswer(res);
    });
  }

  changeAuthorInfo = (name, about) => {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => {
      return this._checkAnswer(res);
    });
  };

  fetchInitialCards = () => {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      credentials: 'include',
      headers: this._headers,
    }).then((res) => {
      return this._checkAnswer(res);

    })
  };

  addNewCard = (link, name) => {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => {
      return this._checkAnswer(res);
    });
  };

  deleteCard = (cardId) => {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      credentials: 'include',
      headers: this._headers,
    }).then((res) => {
      return this._checkAnswer(res);
    });
  };

  createLike = (cardId) => {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      credentials: 'include',
      headers: this._headers,
    }).then((res) => {
      return this._checkAnswer(res);
    });
  };

  deleteLike = (cardId) => {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      credentials: 'include',
      headers: this._headers,
    }).then((res) => {
      return this._checkAnswer(res);
    });
  };

  changeAvatar = (avatarlink) => {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarlink,
      }),
    }).then((res) => {
      return this._checkAnswer(res);
    });
  };
}

export const api = new API({
    baseUrl: BASE_URL,
  headers: {
    "Content-Type": "application/json",

  },
});
