import {playdayAPI} from '../../api/api';
import {Dispatch} from 'react';
import IPlayer from '../../types/interface/IPlayer';
import {AppActions} from '../../types';
import ITeam from '../../types/interface/ITeam';
import {
  GENERATOR_PLAYER_SELECT,
  GENERATOR_RUN,
  GENERATOR_SAVE_FAILURE,
  GENERATOR_SAVE_REQUEST,
  GENERATOR_SAVE_SUCCESS,
  GENERATOR_SELECT_RESET
} from '../../types/generatorActions';

export const generatorPlayerSelected = (player: IPlayer): AppActions => ({
  type: GENERATOR_PLAYER_SELECT,
  player
});

export const generatorPlayersReset = (): AppActions => ({
  type: GENERATOR_SELECT_RESET
});

export const generatorRun = (teams: ITeam[]): AppActions => ({
  type: GENERATOR_RUN,
  teams
});

const generatorSaveRequested = (): AppActions => ({
  type: GENERATOR_SAVE_REQUEST
});

const generatorSaveSuccess = (): AppActions => ({
  type: GENERATOR_SAVE_SUCCESS
});

const generatorSaveError = (error: string): AppActions => {
  return {
    type: GENERATOR_SAVE_FAILURE,
    error
  }
};

export const generatorSaveResult = (teams: ITeam[]) => async (dispatch: Dispatch<AppActions>) => {
  dispatch(generatorSaveRequested());

  try {
    const res = await playdayAPI.addPlayday(teams);
    dispatch(generatorSaveSuccess());
    console.log(res);
  } catch (e) {
    dispatch(generatorSaveError(e.response.data.message));
  }
};
