import {
  AUTH_USER_FAILURE,
  AUTH_USER_REQUEST,
  AUTH_USER_SUCCESS,
  FETCH_USER_SUCCESS,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  LOGOUT_USER
} from '../types';

let initialState = {
  isAuth: false,
  user: {},
  profile: {},
  loading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER_REQUEST: {
      return {
        ...state,
        loading: true
      }
    }

    case AUTH_USER_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        isAuth: true,
        loading: false
      };
    }

    case FETCH_USER_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        isAuth: true,
        loading: false
      }
    }

    case AUTH_USER_FAILURE: {
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    }

    case LOGOUT_USER: {
      return {
        ...state,
        user: {},
        profile: {},
        isAuth: false,
        loading: false
      }
    }

    case GET_PROFILE_REQUEST: {
      return {
        ...state,
        loading: true
      }
    }

    case GET_PROFILE_SUCCESS: {
      return {
        ...state,
        profile: action.payload,
        loading: false
      }
    }

    default:
      return state;
  }
};

export default authReducer;
