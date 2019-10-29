import {createSelector} from 'reselect';

const getPlaydays = (state) => {
  return state.playday.list
};

const getPlaydaysLoading = (state) => {
  return state.playday.loading
};

const getPlayday = (state) => {
  return state.playday.current
};

export const getPlaydaysReselect = createSelector(getPlaydays, list => list);
export const getPlaydaysLoadingReselect = createSelector(getPlaydaysLoading, loading => loading);
export const getPlaydayReselect = createSelector(getPlayday, current => current);
