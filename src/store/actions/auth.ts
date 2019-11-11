import setAuthToken from '../../utils/set-auth-token';
import jwtDecode from 'jwt-decode';
import {Dispatch} from 'react';
import {AppActions} from '../../types';
import {
  AUTH_USER_FAILURE,
  AUTH_USER_REQUEST,
  AUTH_USER_SUCCESS,
  FETCH_USER_SUCCESS,
  LOGOUT_USER
} from '../../types/authActions';
import {stopSubmit} from 'redux-form';
import {authAPI} from '../../api/api';
import ITokenJWT from '../../types/interface/ITokenJWT';

const userRequested = (): AppActions => ({
  type: AUTH_USER_REQUEST
});

const userLoaded = (userData: ITokenJWT): AppActions => ({
  type: AUTH_USER_SUCCESS,
  userData
});

const userError = (error: string): AppActions => ({
  type: AUTH_USER_FAILURE,
  error: error
});

const userLogout = (): AppActions => ({
  type: LOGOUT_USER
});

export const setCurrentUser = (decoded: ITokenJWT): AppActions => ({
  type: FETCH_USER_SUCCESS,
  decoded
});

export const loginUser = (userData: any) => async (dispatch: Dispatch<AppActions>) => {
  dispatch(userRequested());

  try {
    const res = await authAPI.login(userData);
    const {token} = res.data;

    localStorage.setItem('jwtToken', token);
    setAuthToken(token);
    dispatch(userLoaded(jwtDecode(token)));

  } catch (e) {
    dispatch(stopSubmit('login',
        {_error: e.response.data.message}
    ));

    dispatch(userError(e.response.data.message))

  }
};

export const logoutUser = () => (dispatch: Dispatch<AppActions>) => {
  localStorage.removeItem('jwtToken');
  setAuthToken(null);
  //dispatch(userLoaded(null));
  dispatch(userLogout());
};
