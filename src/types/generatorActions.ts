import IPlayer from './interface/IPlayer';
import ITeam from './interface/ITeam';

export interface generatorPlayerSelected {
  type: 'GENERATOR_PLAYER_SELECT'
  player: IPlayer
}

export interface generatorPlayersReset {
  type: 'GENERATOR_SELECT_RESET'
}

export interface generatorRun {
  type: 'GENERATOR_RUN'
  teams: ITeam[]
}

export interface generatorSaveRequested {
  type: 'GENERATOR_SAVE_REQUEST'
}

export interface generatorSaveSuccess {
  type: 'GENERATOR_SAVE_SUCCESS'
}

export interface generatorSaveError {
  type: 'GENERATOR_SAVE_FAILURE',
  error: any
}

export type GeneratorActionTypes =
    | generatorPlayerSelected
    | generatorPlayersReset
    | generatorSaveSuccess
    | generatorRun
    | generatorSaveRequested
    | generatorSaveError
