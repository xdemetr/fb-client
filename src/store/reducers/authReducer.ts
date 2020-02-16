import { AuthActionTypes } from 'types/authActions';
import ITokenJWT from 'types/interface/ITokenJWT';

const initialState = {
  error: '',
  isAuth: false,
  loading: false,
  user: null as ITokenJWT | null,
};

type InitialStateType = typeof initialState;

const authReducer = (state = initialState, action: AuthActionTypes): InitialStateType => {
  switch (action.type) {
    case 'AUTH_USER_REQUEST':
      return {
        ...state,
        loading: true,
      };

    case 'AUTH_USER_SUCCESS':
      return {
        ...state,
        error: '',
        isAuth: true,
        loading: false,
        user: action.userData,
      };

    case 'FETCH_USER_SUCCESS':
      return {
        ...state,
        isAuth: true,
        loading: false,
        user: action.decoded,
      };

    case 'AUTH_USER_FAILURE':
      return {
        ...state,
        error: action.error,
        loading: false,
      };

    case 'LOGOUT_USER':
      return {
        ...state,
        isAuth: false,
        loading: false,
        user: null,
      };

    default:
      return state;
  }
};

export default authReducer;
