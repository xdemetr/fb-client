import {
  FETCH_PLAYDAY_FAILURE,
  FETCH_PLAYDAY_REQUEST,
  FETCH_PLAYDAY_SUCCESS,
  FETCH_PLAYDAYS_FAILURE,
  FETCH_PLAYDAYS_REQUEST,
  FETCH_PLAYDAYS_SUCCESS,
} from '../../types/playdayActions';
import {playdayAPI} from '../../api/api';
import IPlayday from '../../types/interface/IPlayday';
import {AppActions} from '../../types';
import {Dispatch} from 'react';

const playdayListRequested = (): AppActions => ({
  type: FETCH_PLAYDAYS_REQUEST
});

const playdayListLoaded = (playdays: IPlayday[]): AppActions => ({
  type: FETCH_PLAYDAYS_SUCCESS,
  playdays
});

const playdayListError = (error: string): AppActions => ({
  type: FETCH_PLAYDAYS_FAILURE,
  error
});

const playdayRequested = (): AppActions => ({
  type: FETCH_PLAYDAY_REQUEST
});

const playdayLoaded = (current: IPlayday): AppActions => ({
  type: FETCH_PLAYDAY_SUCCESS,
  current
});

const playdayError = (error: string): AppActions => ({
  type: FETCH_PLAYDAY_FAILURE,
  error
});

export const getPlaydays = () => async (dispatch: Dispatch<AppActions>) => {
  dispatch(playdayListRequested());
  try {
    const res = await playdayAPI.getPlaydays();
    dispatch(playdayListLoaded(res.data));
  } catch (e) {
    dispatch(playdayListError(e.message));
  }
};

export const getPlayday = (id: string) => async (dispatch: Dispatch<AppActions>) => {
  dispatch(playdayRequested());

  try {
    const res = await playdayAPI.getPlayday(id);
    dispatch(playdayLoaded(res.data));
  } catch (e) {
    dispatch(playdayError(e.message))
  }
};
