import axios from 'axios';

import IPlayday from 'types/interface/IPlayday';
import IPlaydayList from 'types/interface/IPlaydayList';
import IPlayer from 'types/interface/IPlayer';

// axios.defaults.baseURL = 'http://localhost:5001/fb/api/';
axios.defaults.baseURL = 'https://node.joomdesign.ru/fb/api/';

interface IAuthResolve {
  data: {
    success: boolean;
    token: string;
  };
}

interface IAuthLogin {
  email: string;
  password: string;
}

export const authAPI = {
  // registration(username, email, password) {
  //   return axios.post(`users`, {username, email, password})
  // },
  login(userData: IAuthLogin): Promise<IAuthResolve> {
    return axios.post('users/login', userData);
  },
};

export const playerAPI = {
  getPlayerList(): Promise<{ data: IPlayer[] }> {
    return axios.get('players');
  },
  getPlayer(id: string): Promise<{ data: IPlayer }> {
    return axios.get(`players/${id}`);
  },
  getPlayerByHandle(handle: string): Promise<{data: IPlayer}> {
    return axios.get(`players/handle/${handle}`);
  },
  addPlayer(player: IPlayer): Promise<{data: IPlayer}> {
    return axios.post('players', player);
  },
  updatePlayer(id: string, data: IPlayer): Promise<{data: IPlayer}> {
    return axios.put(`players/${id}`, data);
  },
  deletePlayer(id: string): Promise<any> {
    return axios.delete(`players/${id}`);
  },
};

export const playdayAPI = {
  addPlayday(teams: any): Promise<{ data: IPlayday }> {
    return axios.post('/playdays', teams);
  },
  getPlaydays(): Promise<{ data: IPlaydayList[] }> {
    return axios.get('/playdays');
  },
  getPlayday(id: string): Promise<{ data: IPlayday }> {
    return axios.get(`/playdays/${id}`);
  },
  updatePlayday(id: string, data: any): Promise<{ data: IPlayday }> {
    return axios.put(`playdays/${id}`, data);
  },
};
