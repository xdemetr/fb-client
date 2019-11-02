import {
  FETCH_PLAYDAY_FAILURE,
  FETCH_PLAYDAY_REQUEST,
  FETCH_PLAYDAY_SUCCESS,
  FETCH_PLAYDAYS_FAILURE,
  FETCH_PLAYDAYS_REQUEST,
  FETCH_PLAYDAYS_SUCCESS,
} from '../types';
import {playdayAPI} from '../../api/api';

const playdayListRequested = () => {
  return {
    type: FETCH_PLAYDAYS_REQUEST
  }
};

const playdayListLoaded = playdays => {
  return {
    type: FETCH_PLAYDAYS_SUCCESS,
    payload: playdays
  }
};

const playdayListError = error => {
  return {
    type: FETCH_PLAYDAYS_FAILURE,
    payload: error
  }
};

const playdayRequested = () => {
  return {
    type: FETCH_PLAYDAY_REQUEST
  }
};

const playdayLoaded = playdays => {
  return {
    type: FETCH_PLAYDAY_SUCCESS,
    payload: playdays
  }
};

const playdayError = error => {
  return {
    type: FETCH_PLAYDAY_FAILURE,
    payload: error
  }
};

export const getPlaydays = () => async dispatch => {
  dispatch(playdayListRequested());

  try {
    const res = await playdayAPI.getPlaydays();
    dispatch(playdayListLoaded(res.data));
  } catch (e) {
    dispatch(playdayListError(e.message));
  }
};

export const getPlayday = id => async dispatch => {
  dispatch(playdayRequested());

  try {
    const res = await playdayAPI.getPlayday(id);
    dispatch(playdayLoaded(res.data));
  } catch (e) {
    dispatch(playdayError(e.message))
  }
};
