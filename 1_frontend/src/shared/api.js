import axios from 'axios';

const HOST = 'http://localhost:5000';

class API {
  async signup(userData) {
    const { data } = await axios.post(HOST + '/api/users', userData);

    return data;
  }
  async login(userData) {
    const { data } = await axios.post(HOST + '/api/users/login', userData);

    return data;
  }
  async account(config) {
    const { data } = await axios.get(HOST + '/api/users/account', config);

    return data;
  }
}

const api = new API();

export default api;
