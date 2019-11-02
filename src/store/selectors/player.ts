import {createSelector} from 'reselect';
import {AppState} from '../store';

const getPlayerList = (state: AppState) => {
  return state.player.list
};

const getPlayerLoading = (state: AppState) => {
  return state.player.loading
};

const getPlayerError = (state: AppState) => {
  return state.player.error
};

const getPlayerCurrent = (state: AppState) => {
  return state.player.current
};

export const getPlayerListReselect = createSelector(getPlayerList, list => list);
export const getPlayerLoadingReselect = createSelector(getPlayerLoading, loading => loading);
export const getPlayerErrorReselect = createSelector(getPlayerError, error => error);
export const getPlayerCurrentReselect = createSelector(getPlayerCurrent, current => current);

