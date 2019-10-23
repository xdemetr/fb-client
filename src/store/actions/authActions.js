import {stopSubmit} from 'redux-form';
import {AUTH_USER_REQUEST, AUTH_USER_SUCCESS, FETCH_USER_SUCCESS, LOGOUT_USER} from '../types';
import {authAPI} from '../../api/api';
import jwtDecode from 'jwt-decode';
import setAuthToken from '../../utils/set-auth-token';


const userRequested = () => {
  return {
    type: AUTH_USER_REQUEST
  }
};

const userLoaded = (userData) => {
  return {
    type: AUTH_USER_SUCCESS,
    payload: userData
  }
};

const userLogout = () => {
  return {
    type: LOGOUT_USER
  }
};

export const setCurrentUser = (decoded) => {
  return{
    type: FETCH_USER_SUCCESS,
    payload: decoded
  }
};

export const loginUser = userData => async dispatch => {
  dispatch(userRequested());

  try {
    const res = await authAPI.login(userData);
    const {token} = res.data;

    localStorage.setItem('jwtToken', token);
    setAuthToken(token);
    dispatch(userLoaded(jwtDecode(token)));

  } catch (e) {
    dispatch(stopSubmit('login',
        {_error: 'Ошибка какая-то...'}
    ));
  }
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(userLoaded({}));
  dispatch(userLogout());
};
