import {
  AUTH_USER_FAILURE,
  AUTH_USER_REQUEST,
  AUTH_USER_SUCCESS,
  AuthActionTypes,
  FETCH_USER_SUCCESS,
  LOGOUT_USER
} from '../../types/authActions';
import ITokenJWT from '../../types/interface/ITokenJWT';

interface authReducerState {
  isAuth: boolean,
  user: ITokenJWT | null,
  loading: boolean,
  error?: string
}

const authReducerDefaultState: authReducerState = {
  isAuth: false,
  user: null,
  loading: false,
  error: ''
};

const authReducer = (
    state = authReducerDefaultState,
    action: AuthActionTypes
): authReducerState => {
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
        user: action.userData,
        isAuth: true,
        loading: false
      };
    }

    case FETCH_USER_SUCCESS: {
      return {
        ...state,
        user: action.decoded,
        isAuth: true,
        loading: false
      }
    }

    case AUTH_USER_FAILURE: {
      return {
        ...state,
        error: action.error,
        loading: false
      }
    }

    case LOGOUT_USER: {
      return {
        ...state,
        user: null,
        isAuth: false,
        loading: false
      }
    }

    default:
      return state;
  }
};

export default authReducer;
