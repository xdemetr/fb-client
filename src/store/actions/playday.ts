import {
  FETCH_PLAYDAY_FAILURE,
  FETCH_PLAYDAY_REQUEST,
  FETCH_PLAYDAY_SUCCESS,
  FETCH_PLAYDAYS_FAILURE,
  FETCH_PLAYDAYS_REQUEST,
  FETCH_PLAYDAYS_SUCCESS,
  FETCH_POST_PLAYDAY_REQUEST,
  FETCH_POST_PLAYDAY_SUCCESS,
} from '../../types/playdayActions';
import {playdayAPI} from '../../api/api';
import IPlayday from '../../types/interface/IPlayday';
import {AppActions} from '../../types';
import {Dispatch} from 'react';
import IPlaydayList from '../../types/interface/IPlaydayList';

const playdayListRequested = (): AppActions => ({
  type: FETCH_PLAYDAYS_REQUEST
});

const playdayListLoaded = (playdays: IPlaydayList[]): AppActions => ({
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

const playdayPostRequested = (): AppActions => ({
  type: FETCH_POST_PLAYDAY_REQUEST
});

const playdayPostSuccess = (current: IPlayday): AppActions => ({
  type: FETCH_POST_PLAYDAY_SUCCESS,
  current
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

export const updatePlayday = (id: string, name: string, playdayData: any, history: any) => async (dispatch: Dispatch<AppActions>) => {
  dispatch(playdayPostRequested());

  try {
    const res = await playdayAPI.updatePlayday(id, playdayData);
    dispatch(playdayPostSuccess(res.data));
    history.push(`/playdays/${name}`);
  } catch (e) {
    console.log(e)
  }
};
