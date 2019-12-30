import IPlayday from './interface/IPlayday';

interface IPdShort {
  _id: string;
  name: string;
}

interface IPlaydayListRequested {
  type: 'FETCH_PLAYDAYS_REQUEST';
}

interface IPlaydayListLoaded {
  type: 'FETCH_PLAYDAYS_SUCCESS';
  playdays: IPdShort[];
}

interface IPlaydayListError {
  type: 'FETCH_PLAYDAYS_FAILURE';
  error: string;
}

interface IPlaydayRequested {
  type: 'FETCH_PLAYDAY_REQUEST';
}

interface IPlaydayLoaded {
  type: 'FETCH_PLAYDAY_SUCCESS';
  current: IPlayday;
}

interface IPlaydayError {
  type: 'FETCH_PLAYDAY_FAILURE';
  error: string;
}

interface IPlaydayPostRequested {
  type: 'FETCH_POST_PLAYDAY_REQUEST';
}

interface IPlaydayPostSuccess {
  type: 'FETCH_POST_PLAYDAY_SUCCESS';
  current: IPlayday | null;
}

interface IPlaydayRemovePlayer {
  type: 'PLAYDAY_PLAYER_REMOVE';
  data: any;
}

interface IPlaydayAddPlayer {
  type: 'PLAYDAY_PLAYER_ADD';
  data: any;
}

export type PlaydayActionTypes =
  | IPlaydayListRequested
  | IPlaydayListLoaded
  | IPlaydayListError
  | IPlaydayRequested
  | IPlaydayLoaded
  | IPlaydayError
  | IPlaydayPostRequested
  | IPlaydayPostSuccess
  | IPlaydayRemovePlayer
  | IPlaydayAddPlayer;
