import {
  FETCH_PLAYER_REQUEST,
  FETCH_PLAYER_SUCCESS,
  FETCH_PLAYERS_FAILURE,
  FETCH_PLAYERS_REQUEST,
  FETCH_PLAYERS_SUCCESS,
  FETCH_PLAYER_FAILURE,
  FETCH_POST_PLAYER_SUCCESS,
  PlayerActionTypes, FETCH_POST_PLAYER_REQUEST
} from '../../types/playerActions';
import IPlayer from '../../types/interface/IPlayer';

interface playerReducerState {
  list: IPlayer[],
  current: IPlayer | null,
  selected: IPlayer[],
  loading: boolean,
  error: string
}

const playerReducerDefaultState: playerReducerState = {
  list: [],
  current: null,
  selected: [],
  loading: false,
  error: ''
};

const playerReducer = (
    state = playerReducerDefaultState,
    action: PlayerActionTypes
): playerReducerState => {
  switch (action.type) {
    case FETCH_PLAYERS_REQUEST: {
      return {
        ...state,
        loading: true
      }
    }

    case FETCH_PLAYERS_SUCCESS: {
      return {
        ...state,
        loading: false,
        list: action.players
      }
    }

    case FETCH_PLAYERS_FAILURE: {
      return {
        ...state,
        error: action.error,
        loading: false
      }
    }

    case FETCH_PLAYER_REQUEST: {
      return {
        ...state,
        loading: true
      }
    }

    case FETCH_PLAYER_SUCCESS: {
      return {
        ...state,
        current: action.player,
        loading: false
      }
    }

    case FETCH_PLAYER_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.error
      }
    }

    case FETCH_POST_PLAYER_REQUEST: {
      return {
        ...state,
        loading: true
      }
    }

    case FETCH_POST_PLAYER_SUCCESS: {
      return {
        ...state,
        loading: false,
        current: action.player
      }
    }

    default:
      return state;
  }
};

export default playerReducer;
