import {createSelector} from 'reselect';

const getPlayerList = (state) => {
  return state.player.list
};

const getPlayerLoading = (state) => {
  return state.player.loading
};

const getPlayerError = (state) => {
  return state.player.error
};

const getPlayerCurrent = (state) => {
  return state.player.current
};

export const getPlayerListReselect = createSelector(getPlayerList, list => list);
export const getPlayerLoadingReselect = createSelector(getPlayerLoading, loading => loading);
export const getPlayerErrorReselect = createSelector(getPlayerError, error => error);
export const getPlayerCurrentReselect = createSelector(getPlayerCurrent, current => current);

