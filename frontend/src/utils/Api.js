class Api {
    constructor({ url, headers }) {
        this.url = url;
        this.headers = headers;
    }
    //Добавление карточек с сервера
    getInitialCards(token) {
        return fetch(`${this.url}/cards`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            // headers: this.headers,
        })
        .then(this._handleResponse)
    }
    //добавление новой карточки
    addTask(data, token) {
        return fetch(`${this.url}/cards`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            // headers: this.headers,
            body: JSON.stringify(data)
        })
            .then(this._handleResponse)
    }
    //Удаление карточки
    deleteTask(cardId, token) {
        return fetch(`${this.url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            // headers: this.headers,
        })
        .then(this._handleResponse)
    }

    //Редактирование профиля(получаю данные с сервера)
    getUserInfo(token) {
        return fetch(`${this.url}/users/me`, {
            // method: 'PATCH',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            // headers: this.headers,
        })
        .then(this._handleResponse)
    }

    //редактирование профиля(Отправляю данные да сервер)
    setUserInfo({name, about}, token) {
        return fetch(`${this.url}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            // headers: this.headers,
            body: JSON.stringify({
                name,
                about
            })
        })
        .then(this._handleResponse)
    }

    //замена аватара
    setUserAvatar(avatar, token) {
        return fetch(`${this.url}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            // headers: this.headers,
            body: JSON.stringify(avatar)
        })
        .then(this._handleResponse)
    }

    //лайки
    likeCard(id, like, token) {
        return fetch(`${this.url}/cards/likes/${id}`, {
            method: like ? 'DELETE' : 'PUT',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            // headers: this.headers,
        })
        .then(this._handleResponse)
    }


    _handleResponse = (res) => {
        if (res.ok) {
            return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
    }
}

const api = new Api({                   //9
    // url: 'https://mesto.nomoreparties.co/v1/cohort-26',
    // url: 'http://localhost:3000',
    url: 'https://api.application-mesto.nomoredomains.xyz',
    // headers: {
    //   authorization: '4187936b-f13d-40c6-aac3-45e4140019db',
    //   'Content-Type': 'application/json'
    // }
})

export default api;