import IPlayer from './interface/IPlayer';

type playerListRequested = {
  type: 'FETCH_PLAYERS_REQUEST'
}

type playerListLoaded = {
  type: 'FETCH_PLAYERS_SUCCESS',
  players: IPlayer[]
}

type playerListError = {
  type: 'FETCH_PLAYERS_FAILURE',
  error: string
}

type playerRequested = {
  type: 'FETCH_PLAYER_REQUEST'
}

type playerLoaded = {
  type: 'FETCH_PLAYER_SUCCESS',
  player: IPlayer
}

type playerError = {
  type: 'FETCH_PLAYER_FAILURE',
  error: string
}

type playerPostRequested = {
  type: 'FETCH_POST_PLAYER_REQUEST'
}

type playerPostSuccess = {
  type: 'FETCH_POST_PLAYER_SUCCESS',
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
