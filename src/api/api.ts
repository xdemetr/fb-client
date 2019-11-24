import axios from 'axios';
import IPlayer from '../types/interface/IPlayer';
import IPlayday from '../types/interface/IPlayday';
import IPlaydayList from '../types/interface/IPlaydayList';

//axios.defaults.baseURL = 'http://localhost:5001/fb/api/';
axios.defaults.baseURL = 'https://node.joomdesign.ru/fb/api/';

type authResolve = {
  data: {
    success: boolean
    token: string
  }
}

type authLogin = {
  email: string
  password: string
}

export const authAPI = {
  // registration(username, email, password) {
  //   return axios.post(`users`, {username, email, password})
  // },
  login(userData: authLogin): Promise<authResolve> {
    return axios.post(`users/login`, userData)
  }
};

export const playerAPI = {
  getPlayerList(): Promise<any> {
    return axios.get(`players`);
  },
  getPlayer(id: string): Promise<any> {
    return axios.get(`players/${id}`)
  },
  getPlayerByHandle(handle: string): Promise<any> {
    return axios.get(`players/handle/${handle}`)
  },
  addPlayer(player: IPlayer): Promise<any> {
    return axios.post(`players`, player)
  },
  updatePlayer(id: string, data: IPlayer): Promise<any> {
    return axios.put(`players/${id}`, data)
  },
  deletePlayer(id: string): Promise<any> {
    return axios.delete(`players/${id}`)
  }
};

export const playdayAPI = {
  addPlayday(teams: any): Promise<{ data: IPlayday }> {
    return axios.post(`/playdays`, teams)
  },
  getPlaydays(): Promise<{data: IPlaydayList[]}> {
    return axios.get(`/playdays`)
  },
  getPlayday(id: string): Promise<{ data: IPlayday }> {
    return axios.get(`/playdays/${id}`)
  },
  updatePlayday(id: string, data: any): Promise<{ data: IPlayday }> {
    return axios.put(`playdays/${id}`, data)
  },
};
