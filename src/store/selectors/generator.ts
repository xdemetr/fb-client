import { createSelector } from 'reselect';
import { AppState } from 'store/store';

const getSelectedPlayers = (state: AppState) => {
  return state.generator.selected;
};

const getGeneratorResult = (state: AppState) => {
  return state.generator.result;
};

export const getSelectedPlayersReselect = createSelector(getSelectedPlayers, selected => selected);
export const getGeneratorResultReselect = createSelector(getGeneratorResult, result => result);
export const getGeneratorErrors = (state: AppState) => {
  return state.generator.error;
};
