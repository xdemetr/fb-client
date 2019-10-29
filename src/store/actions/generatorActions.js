import {
  GENERATOR_PLAYER_SELECT,
  GENERATOR_RUN, GENERATOR_SAVE_FAILURE,
  GENERATOR_SAVE_REQUEST,
  GENERATOR_SAVE_SUCCESS,
  GENERATOR_SELECT_RESET
} from '../types';
import {playdayAPI} from '../../api/api';

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

const generatorSaveRequested = () => {
  return {
    type: GENERATOR_SAVE_REQUEST
  }
};

const generatorSaveSuccess = () => {
  return {
    type: GENERATOR_SAVE_SUCCESS
  }
};

const generatorSaveError = (error) => {
  return {
    type: GENERATOR_SAVE_FAILURE,
    payload: error
  }
};

export const generatorSaveResult = (teams) => async dispatch => {
  dispatch(generatorSaveRequested());

  try {
    const res = await playdayAPI.addPlayday(teams);
    dispatch(generatorSaveSuccess());
    console.log(res);
  }
  catch (e) {
    dispatch(generatorSaveError(e.response.data.message));
  }
};
