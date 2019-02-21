import config from '../config/config';

class API {
  constructor(endpoint) {
    this.endpoint = `${config.baseUrl}/api/${endpoint.replace(/^\//, '')}`;
    this.method = 'GET';
    this.headers = {
      'Content-Type': 'application/json',
    };
  }

  setHeaders(headers) {
    for (const header in headers) {
      this.headers[header] = headers[header];
    }

    return this;
  }

  get(body={}) {
    return this._fetch('GET', body);
  }

  post(body={}) {
    return this._fetch('POST', body);
  }
  
  patch(body={}) {
    return this._fetch('PATCH', body);
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

    body = body instanceof FormData ? body : JSON.stringify(body);
    if (body instanceof FormData) {
      delete headers['Content-Type'];
    }

    const fetchData = {
      method, headers
    };
    if (method !== 'GET') {
      fetchData.body = body;
    }

    fetch(endpoint, fetchData)
      .then(res => res.json())
      .then((data) => {
        if (data.status === 200) {
          this.onSuccess(data.data);
        } else {
          this.onError(data.message);
        }
      })
      .catch(this.onError);
  }
};

export default API;
