import IPlayer from './interface/IPlayer';
import ITeam from './interface/ITeam';

type generatorPlayerSelected = {
  type: 'GENERATOR_PLAYER_SELECT'
  player: IPlayer
}

type generatorPlayersReset = {
  type: 'GENERATOR_SELECT_RESET'
}

type generatorRun = {
  type: 'GENERATOR_RUN'
  teams: ITeam[]
}

type generatorSaveRequested = {
  type: 'GENERATOR_SAVE_REQUEST'
}

type generatorSaveSuccess = {
  type: 'GENERATOR_SAVE_SUCCESS'
}

type generatorSaveError = {
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
