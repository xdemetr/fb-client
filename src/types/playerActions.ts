import IPlayer from './interface/IPlayer';

interface IPlayerListRequested {
  type: 'FETCH_PLAYERS_REQUEST';
}

interface IPlayerListLoaded {
  type: 'FETCH_PLAYERS_SUCCESS';
  players: IPlayer[];
}

interface IPlayerListError {
  type: 'FETCH_PLAYERS_FAILURE';
  error: string;
}

interface IPlayerRequested {
  type: 'FETCH_PLAYER_REQUEST';
}

interface IPlayerLoaded {
  type: 'FETCH_PLAYER_SUCCESS';
  player: IPlayer;
}

interface IPlayerError {
  type: 'FETCH_PLAYER_FAILURE';
  error: string;
}

interface IPlayerPostRequested {
  type: 'FETCH_POST_PLAYER_REQUEST';
}

interface IPlayerPostSuccess {
  type: 'FETCH_POST_PLAYER_SUCCESS';
  player: IPlayer | null;
}

interface IPlayersSetFree {
  type: 'SET_FREE_PLAYERS';
  players: IPlayer[];
}

export type PlayerActionTypes =
  | IPlayerListRequested
  | IPlayerListLoaded
  | IPlayerListError
  | IPlayerRequested
  | IPlayerLoaded
  | IPlayerError
  | IPlayerPostRequested
  | IPlayerPostSuccess
  | IPlayersSetFree;
