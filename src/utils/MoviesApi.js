class MoviesApi {
  constructor() {
    this.baseUrl = 'https://api.nomoreparties.co/beatfilm-movies';
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getMovies() {
    return fetch((this.baseUrl), {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(this._checkResponse);
  }
}

const moviesApi = new MoviesApi();

export default moviesApi;