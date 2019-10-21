import {
  FETCH_PLAYERS_REQUEST,
  FETCH_PLAYERS_SUCCESS,
  FETCH_PLAYERS_FAILURE,
  FETCH_PLAYER_REQUEST,
  FETCH_PLAYER_SUCCESS,
  FETCH_PLAYER_FAILURE,
  FETCH_POST_PLAYER_REQUEST,
  FETCH_POST_PLAYER_SUCCESS
} from '../types';

let initialState = {
  list: [],
  current: {},
  selected: [],
  loading: false,
  error: null
};

const playerReducer = (state = initialState, action) => {
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
        list: action.payload
      }
    }

    case FETCH_PLAYERS_FAILURE: {
      return {
        ...state,
        error: action.payload,
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
        current: action.payload,
        loading: false
      }
    }

    case FETCH_PLAYER_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload
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
        current: action.payload
      }
    }

    default:
      return state;
  }
};

export default playerReducer;
