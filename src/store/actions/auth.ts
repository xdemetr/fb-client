import jwtDecode from 'jwt-decode';
import { Dispatch } from 'react';

import { authAPI } from 'api/api';
import { AppActions } from 'types';
import setAuthToken from 'utils/set-auth-token';

import ITokenJWT from 'types/interface/ITokenJWT';

const userRequested = (): AppActions => ({
  type: 'AUTH_USER_REQUEST',
});

const userLoaded = (userData: ITokenJWT): AppActions => ({
  userData,
  // tslint:disable-next-line:object-literal-sort-keys
  type: 'AUTH_USER_SUCCESS',
});

const userError = (error: string): AppActions => ({
  error,
  type: 'AUTH_USER_FAILURE',
});

const userLogout = (): AppActions => ({
  type: 'LOGOUT_USER',
});

export const setCurrentUser = (decoded: ITokenJWT): AppActions => ({
  decoded,
  type: 'FETCH_USER_SUCCESS',
});

export const loginUser = (
  userData: { email: string, password: string },
) => async (dispatch: Dispatch<AppActions>) => {
  dispatch(userRequested());

  try {
    const res = await authAPI.login(userData);
    const { token } = res.data;

    localStorage.setItem('jwtToken', token);
    setAuthToken(token);
    dispatch(userLoaded(jwtDecode(token)));
  } catch (error) {
    if (error.response) {
      dispatch(userError(error.response.data.message));
    } else {
      dispatch(userError(error.message));
    }
  }
};

export const logoutUser = () => (dispatch: Dispatch<AppActions>) => {
  localStorage.removeItem('jwtToken');
  setAuthToken(null);
  // dispatch(userLoaded(null));
  dispatch(userLogout());
};
