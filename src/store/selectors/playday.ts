import {createSelector} from 'reselect';
import {AppState} from '../store';

const getPlaydays = (state: AppState) => {
  return state.playday.list
};

const getPlaydaysLoading = (state: AppState) => {
  return state.playday.loading
};

const getPlayday = (state: AppState) => {
  return state.playday.current
};

export const getPlaydaysReselect = createSelector(getPlaydays, list => list);
export const getPlaydaysLoadingReselect = createSelector(getPlaydaysLoading, loading => loading);
export const getPlaydayReselect = createSelector(getPlayday, current => current);
