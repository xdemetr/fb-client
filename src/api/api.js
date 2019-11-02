import axios from 'axios';

//axios.defaults.baseURL = 'http://localhost:5001/fb/api/';
axios.defaults.baseURL = 'https://node.joomdesign.ru/fb/api/';

export const authAPI = {
  registration(username, email, password) {
    return axios.post(`users`, {username, email, password})
  },
  login(userData) {
    return axios.post(`users/login`, userData)
  }
};

export const playerAPI = {
  getPlayerList() {
    return axios.get(`players`);
  },
  getPlayer(id) {
    return axios.get(`players/${id}`)
  },
  addPlayer(player) {
    return axios.post(`players`, player)
  },
  updatePlayer(id, data) {
    return axios.put(`players/${id}`, data)
  },
  deletePlayer(id) {
    return axios.delete(`players/${id}`)
  }
};

export const playdayAPI = {
  addPlayday(teams) {
    return axios.post(`/playdays`, teams)
  },
  getPlaydays() {
    return axios.get(`/playdays`)
  },
  getPlayday(id) {
    return axios.get(`/playdays/${id}`)
  }
};
