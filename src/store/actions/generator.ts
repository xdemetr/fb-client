import { Dispatch } from 'react';
import { playdayAPI } from '../../api/api';
import { AppActions } from '../../types';

import IPlayer from '../../types/interface/IPlayer';
import ITeam from '../../types/interface/ITeam';

export const generatorPlayerSelected = (player: IPlayer): AppActions => ({
  player,
  type: 'GENERATOR_PLAYER_SELECT',
});

export const generatorPlayersReset = (): AppActions => ({
  type: 'GENERATOR_SELECT_RESET',
});

export const generatorRun = (teams: ITeam[]): AppActions => ({
  teams,
  type: 'GENERATOR_RUN',
});

const generatorSaveRequested = (): AppActions => ({
  type: 'GENERATOR_SAVE_REQUEST',
});

const generatorSaveSuccess = (): AppActions => ({
  type: 'GENERATOR_SAVE_SUCCESS',
});

const generatorSaveError = (error: string): AppActions => {
  return {
    error,
    type: 'GENERATOR_SAVE_FAILURE',
  };
};

export const generatorSaveResult = (teams: ITeam[]) => async (dispatch: Dispatch<AppActions>) => {
  dispatch(generatorSaveRequested());

  try {
    const res = await playdayAPI.addPlayday(teams);
    dispatch(generatorSaveSuccess());
    return res.data;
    // console.log(res);
  } catch (e) {
    dispatch(generatorSaveError(e.response.data.message));
  }
};
