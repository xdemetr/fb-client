import {
  FETCH_PLAYDAY_REQUEST,
  FETCH_PLAYDAY_SUCCESS,
  FETCH_PLAYDAYS_FAILURE,
  FETCH_PLAYDAYS_REQUEST,
  FETCH_PLAYDAYS_SUCCESS
} from '../types';

let initialState = {
  list: [],
  current: null,
  loading: false,
  error: null
};

const playdayReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PLAYDAYS_REQUEST: {
      return {
        ...state,
        loading: true
      }
    }

    case FETCH_PLAYDAYS_SUCCESS: {
      return {
        ...state,
        list: action.payload,
        loading: false
      }
    }

    case FETCH_PLAYDAYS_FAILURE: {
      return {
        ...state,
        error: action.payload
      }
    }

    case FETCH_PLAYDAY_REQUEST: {
      return {
        ...state,
        loading: true
      }
    }

    case FETCH_PLAYDAY_SUCCESS: {
      return {
        ...state,
        current: action.payload,
        loading: false
      }
    }

    default:
      return state;
  }
};

export default playdayReducer;
