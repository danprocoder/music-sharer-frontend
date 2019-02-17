import config from '../config/config';

class API {
  constructor(endpoint) {
    this.endpoint = `${config.baseUrl}/api/${endpoint}`;
    this.method = 'GET';
    this.headers = {
      'Content-Type': 'application/json',
    };
  }

  headers(headers) {
    headers.forEach(((k, v) => {
      this.headers[k] = v;
    }).bind(this));

    return this;
  }

  get(body={}) {
    return this._fetch('GET', body);
  }

  post(body={}) {
    return this._fetch('POST', body);
  }

  success(callback) {
    this.onSuccess = callback;
    return this;
  }

  error(callback) {
    this.onError = callback;
    return this;
  }

  _fetch(method, body) {
    const { headers, endpoint } = this;

    fetch(endpoint, {
      method,
      headers,
      body: JSON.stringify(body),
    })
      .then(res => res.json())
      .then((data) => {
        this.onSuccess(data.data);
      })
      .catch(this.onError);
  }
};

export default API;
