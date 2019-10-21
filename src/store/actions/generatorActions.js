import {GENERATOR_PLAYER_SELECT, GENERATOR_RUN, GENERATOR_SELECT_RESET} from '../types';

export const generatorPlayerSelected = player => {
  return {
    type: GENERATOR_PLAYER_SELECT,
    payload: player
  }
};

export const generatorPlayersReset = () => {
  return {
    type: GENERATOR_SELECT_RESET
  }
};

export const generatorRun = (teams) => {
  return {
    type: GENERATOR_RUN,
    payload: teams
  }
};
