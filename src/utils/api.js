class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _contactTheServer(currentPromise) {
    return currentPromise
      .then(response => {
        if (!response.ok) {
          return Promise.reject(`Ошибка ${response.status}`);
        }
        return response.json();
      })
  }

  getUserInformation() {
    return this._contactTheServer(fetch(`${this._url}/users/me`, {
      headers: this._headers,
      method: 'GET',
    }));
  }

  getCards() {
    return this._contactTheServer(fetch(`${this._url}/cards`, {
      headers: this._headers,
      method: 'GET',
    }));
  }

  editProfile(newUserInfo) {
    return this._contactTheServer(fetch(`${this._url}/users/me`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify(newUserInfo),
    }));
  }

  addNewCardToServer(newCardInfo) {
    return this._contactTheServer(fetch(`${this._url}/cards`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify(newCardInfo)
    }));
  }

  deleteCardFromServer(cardId) {
    return this._contactTheServer(fetch(`${this._url}/cards/${cardId}`, {
      headers: this._headers,
      method: 'DELETE',
    }));
  }

  putLike(cardID, isNotLiked) {
    return this._contactTheServer(fetch(`${this._url}/cards/likes/${cardID}`, {
      headers: this._headers,
      method: isNotLiked ? 'PUT': 'DELETE',
    }));
  }

  updateAvatar(avatar) {
    return this._contactTheServer(fetch(`${this._url}/users/me/avatar`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify(avatar)
    }));
  }
}

const api = new Api({
  url: 'https://nomoreparties.co/v1/cohort-27',
  headers: {
    'authorization': '49889f34-1928-497a-a94e-146b8fe6d002',
    'Content-Type': 'application/json',
  },
});

export default api;
