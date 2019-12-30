import { AuthActionTypes } from '../../types/authActions';
import ITokenJWT from '../../types/interface/ITokenJWT';

interface IAuthReducerState {
  isAuth: boolean;
  user: ITokenJWT | null;
  loading: boolean;
  error?: string;
}

const authReducerDefaultState: IAuthReducerState = {
  error: '',
  isAuth: false,
  loading: false,
  user: null,
};

const authReducer = (
  state = authReducerDefaultState,
  action: AuthActionTypes,
): IAuthReducerState => {
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
