import { createSelector } from 'reselect';
import { AppState } from 'store/store';
import { getPlayday } from './playday';

const getPlayerList = (state: AppState) => {
  return state.player.list;
};

const getPlayerLoading = (state: AppState) => {
  return state.player.loading;
};

const getPlayerError = (state: AppState) => {
  return state.player.error;
};

const getPlayerCurrent = (state: AppState) => {
  return state.player.current;
};

export const getPlayerFreeListReselect = createSelector(
  [getPlayerList, getPlayday],
  (list, playday) => {

    let newArr: any[] = [];
    if (playday && list) {
      const selectedPlayers = [...playday.teams[0], ...playday.teams[1], ...playday.teams[2]];

      const keysSelectedFilter = selectedPlayers.map(i => i._id);
      newArr = list.filter(pl => !keysSelectedFilter.includes(pl._id)).map(pl => pl);
    }

    return newArr;
  },
);

export const getPlayerListReselect = createSelector(getPlayerList, list => list);
export const getPlayerLoadingReselect = createSelector(getPlayerLoading, loading => loading);
export const getPlayerErrorReselect = createSelector(getPlayerError, error => error);
export const getPlayerCurrentReselect = createSelector(getPlayerCurrent, current => current);
