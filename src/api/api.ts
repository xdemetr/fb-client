import axios from 'axios';
import IPlayer from '../types/interface/IPlayer';

//axios.defaults.baseURL = 'http://localhost:5001/fb/api/';
axios.defaults.baseURL = 'https://node.joomdesign.ru/fb/api/';

interface authResolve {
  data: {
    success: boolean,
    token: string
  }
}

interface authLogin {
  email: string,
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
  addPlayday(teams:any):Promise<any> {
    return axios.post(`/playdays`, teams)
  },
  getPlaydays():Promise<any> {
    return axios.get(`/playdays`)
  },
  getPlayday(id:string):Promise<any> {
    return axios.get(`/playdays/${id}`)
  }
};
