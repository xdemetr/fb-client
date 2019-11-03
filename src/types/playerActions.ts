import IPlayer from './interface/IPlayer';

export const FETCH_PLAYERS_REQUEST = 'FETCH_PLAYERS_REQUEST';
export const FETCH_PLAYERS_SUCCESS = 'FETCH_PLAYERS_SUCCESS';
export const FETCH_PLAYERS_FAILURE = 'FETCH_PLAYERS_FAILURE';

export const FETCH_PLAYER_REQUEST = 'FETCH_PLAYER_REQUEST';
export const FETCH_PLAYER_SUCCESS = 'FETCH_PLAYER_SUCCESS';
export const FETCH_PLAYER_FAILURE = 'FETCH_PLAYER_FAILURE';

export const FETCH_POST_PLAYER_REQUEST = 'FETCH_POST_PLAYER_REQUEST';
export const FETCH_POST_PLAYER_SUCCESS = 'FETCH_POST_PLAYER_SUCCESS';

export const FETCH_POST_PLAYER_FAILURE = 'FETCH_POST_PLAYER_FAILURE';

interface playerListRequested {
  type: typeof FETCH_PLAYERS_REQUEST
}

interface playerListLoaded {
  type: typeof FETCH_PLAYERS_SUCCESS,
  players: IPlayer[]
}

interface playerListError {
  type: typeof FETCH_PLAYERS_FAILURE,
  error: string
}

interface playerRequested {
  type: typeof FETCH_PLAYER_REQUEST
}

interface playerLoaded {
  type: typeof FETCH_PLAYER_SUCCESS,
  player: IPlayer
}

interface playerError {
  type: typeof FETCH_PLAYER_FAILURE,
  error: string
}

interface playerPostRequested {
  type: typeof FETCH_POST_PLAYER_REQUEST
}

interface playerPostSuccess {
  type: typeof FETCH_POST_PLAYER_SUCCESS,
  player: IPlayer | null
}

export type PlayerActionTypes =
    | playerListRequested
    | playerListLoaded
    | playerListError
    | playerRequested
    | playerLoaded
    | playerError
    | playerPostRequested
    | playerPostSuccess
