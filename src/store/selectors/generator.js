import {createSelector} from 'reselect';

const getSelectedPlayers = (state) => {
  return state.generator.selected
};

const getGeneratorResult = (state) => {
  return state.generator.result
};

export const getSelectedPlayersReselect = createSelector(getSelectedPlayers, selected => selected);
export const getGeneratorResultReselect = createSelector(getGeneratorResult, result => result);
export const getGeneratorErrors = (state) => {
  return state.generator.errors
};
