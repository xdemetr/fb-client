import IPlayer from './interface/IPlayer';
import ITeam from './interface/ITeam';

export const GENERATOR_PLAYER_SELECT = 'GENERATOR_PLAYER_SELECT';
export const GENERATOR_SELECT_RESET = 'GENERATOR_SELECT_RESET';
export const GENERATOR_RUN = 'GENERATOR_RUN';
//export const GENERATOR_RESULT_RESET = 'GENERATOR_RESULT_RESET';
export const GENERATOR_SAVE_REQUEST = 'GENERATOR_SAVE_REQUEST';
export const GENERATOR_SAVE_FAILURE = 'GENERATOR_SAVE_FAILURE';
export const GENERATOR_SAVE_SUCCESS = 'GENERATOR_SAVE_SUCCESS';

export interface generatorPlayerSelected {
  type: typeof GENERATOR_PLAYER_SELECT,
  player: IPlayer
}

export interface generatorPlayersReset {
  type: typeof GENERATOR_SELECT_RESET
}

export interface generatorRun {
  type: typeof GENERATOR_RUN,
  teams: ITeam[]
}

export interface generatorSaveRequested {
  type: typeof GENERATOR_SAVE_REQUEST
}

export interface generatorSaveSuccess {
  type: typeof GENERATOR_SAVE_SUCCESS
}

export interface generatorSaveError {
  type: typeof GENERATOR_SAVE_FAILURE,
  error: any
}

export type GeneratorActionTypes =
    | generatorPlayerSelected
    | generatorPlayersReset
    | generatorSaveSuccess
    | generatorRun
    | generatorSaveRequested
    | generatorSaveError
