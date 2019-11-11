import IPlayday from './interface/IPlayday';

export const FETCH_PLAYDAYS_REQUEST = 'FETCH_PLAYDAYS_REQUEST';
export const FETCH_PLAYDAYS_SUCCESS = 'FETCH_PLAYDAYS_SUCCESS';
export const FETCH_PLAYDAYS_FAILURE = 'FETCH_PLAYDAYS_FAILURE';

export const FETCH_PLAYDAY_REQUEST = 'FETCH_PLAYDAY_REQUEST';
export const FETCH_PLAYDAY_SUCCESS = 'FETCH_PLAYDAY_SUCCESS';
export const FETCH_PLAYDAY_FAILURE = 'FETCH_PLAYDAY_FAILURE';

export const FETCH_POST_PLAYDAY_REQUEST = 'FETCH_POST_PLAYDAY_REQUEST';
export const FETCH_POST_PLAYDAY_SUCCESS = 'FETCH_POST_PLAYDAY_SUCCESS';

interface playdayListRequested {
  type: typeof FETCH_PLAYDAYS_REQUEST
}

interface playdayListLoaded {
  type: typeof FETCH_PLAYDAYS_SUCCESS,
  playdays: Array<{ _id: string, name: string }>
}

interface playdayListError {
  type: typeof FETCH_PLAYDAYS_FAILURE,
  error: string
}

interface playdayRequested {
  type: typeof FETCH_PLAYDAY_REQUEST
}

interface playdayLoaded {
  type: typeof FETCH_PLAYDAY_SUCCESS,
  current: IPlayday
}

interface playdayError {
  type: typeof FETCH_PLAYDAY_FAILURE,
  error: string
}

interface playdayPostRequested {
  type: typeof FETCH_POST_PLAYDAY_REQUEST
}

interface playdayPostSuccess {
  type: typeof FETCH_POST_PLAYDAY_SUCCESS,
  playday: IPlayday | null
}

export type PlaydayActionTypes =
    | playdayListRequested
    | playdayListLoaded
    | playdayListError
    | playdayRequested
    | playdayLoaded
    | playdayError
    | playdayPostRequested
    | playdayPostSuccess
