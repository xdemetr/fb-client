import {PlayerActionTypes} from '../../types/playerActions';
import IPlayer from '../../types/interface/IPlayer';

type playerReducerState = {
  list: IPlayer[],
  current: IPlayer | null,
  selected: IPlayer[],
  freePlayers: IPlayer[],
  loading: boolean,
  error: string
}

const playerReducerDefaultState: playerReducerState = {
  list: [],
  current: null,
  selected: [],
  freePlayers: [],
  loading: false,
  error: ''
};

const playerReducer = (
    state = playerReducerDefaultState,
    action: PlayerActionTypes
): playerReducerState => {
  switch (action.type) {

    case 'FETCH_PLAYERS_REQUEST':
      return {
        ...state,
        loading: true
      };

    case 'FETCH_PLAYERS_SUCCESS':
      return {
        ...state,
        loading: false,
        list: action.players
      };

    case 'FETCH_PLAYERS_FAILURE':
      return {
        ...state,
        error: action.error,
        loading: false
      };

    case 'FETCH_PLAYER_REQUEST':
      return {
        ...state,
        loading: true
      };

    case 'FETCH_PLAYER_SUCCESS':
      return {
        ...state,
        current: action.player,
        loading: false
      };

    case 'FETCH_PLAYER_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error
      };

    case 'FETCH_POST_PLAYER_REQUEST':
      return {
        ...state,
        loading: true
      };

    case 'FETCH_POST_PLAYER_SUCCESS':
      return {
        ...state,
        loading: false,
        current: action.player
      };

    case 'SET_FREE_PLAYERS':
      return {
        ...state,
        freePlayers: action.players
      };

    default:
      return state;
  }
};

export default playerReducer;
