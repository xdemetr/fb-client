import IPlayer from './interface/IPlayer';
import ITeam from './interface/ITeam';

interface IGeneratorPlayerSelected {
  type: 'GENERATOR_PLAYER_SELECT';
  player: IPlayer;
}

interface IGeneratorPlayersReset {
  type: 'GENERATOR_SELECT_RESET';
}

interface IGeneratorRun {
  type: 'GENERATOR_RUN';
  teams: ITeam[];
}

interface IGeneratorSaveRequested {
  type: 'GENERATOR_SAVE_REQUEST';
}

interface IGeneratorSaveSuccess {
  type: 'GENERATOR_SAVE_SUCCESS';
}

interface IGeneratorSaveError {
  type: 'GENERATOR_SAVE_FAILURE';
  error: any;
}

export type GeneratorActionTypes =
  | IGeneratorPlayerSelected
  | IGeneratorPlayersReset
  | IGeneratorSaveSuccess
  | IGeneratorRun
  | IGeneratorSaveRequested
  | IGeneratorSaveError;
