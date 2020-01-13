import IPlayer from 'types/interface/IPlayer';
import { PlayerActionTypes } from 'types/playerActions';

interface IPlayerReducerState {
  current: IPlayer | null;
  error: string;
  freePlayers: IPlayer[];
  list: IPlayer[];
  loading: boolean;
  selected: IPlayer[];
}

const playerReducerDefaultState: IPlayerReducerState = {
  current: null,
  error: '',
  freePlayers: [],
  list: [],
  loading: false,
  selected: [],
};

const playerReducer = (
  state = playerReducerDefaultState,
  action: PlayerActionTypes,
): IPlayerReducerState => {
  switch (action.type) {
    case 'FETCH_PLAYERS_REQUEST':
      return {
        ...state,
        loading: true,
      };

    case 'FETCH_PLAYERS_SUCCESS':
      return {
        ...state,
        list: action.players,
        loading: false,
      };

    case 'FETCH_PLAYERS_FAILURE':
      return {
        ...state,
        error: action.error,
        loading: false,
      };

    case 'FETCH_PLAYER_REQUEST':
      return {
        ...state,
        loading: true,
      };

    case 'FETCH_PLAYER_SUCCESS':
      return {
        ...state,
        current: action.player,
        loading: false,
      };

    case 'FETCH_PLAYER_FAILURE':
      return {
        ...state,
        error: action.error,
        loading: false,
      };

    case 'FETCH_POST_PLAYER_REQUEST':
      return {
        ...state,
        loading: true,
      };

    case 'FETCH_POST_PLAYER_SUCCESS':
      return {
        ...state,
        current: action.player,
        loading: false,
      };

    case 'SET_FREE_PLAYERS':
      return {
        ...state,
        freePlayers: action.players,
      };

    default:
      return state;
  }
};

export default playerReducer;
