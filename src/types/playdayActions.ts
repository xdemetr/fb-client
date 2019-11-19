import IPlayday from './interface/IPlayday';

type playdayListRequested = {
  type: 'FETCH_PLAYDAYS_REQUEST'
}

type playdayListLoaded = {
  type: 'FETCH_PLAYDAYS_SUCCESS',
  playdays: Array<{ _id: string, name: string }>
}

type playdayListError = {
  type: 'FETCH_PLAYDAYS_FAILURE',
  error: string
}

type playdayRequested = {
  type: 'FETCH_PLAYDAY_REQUEST'
}

type playdayLoaded = {
  type: 'FETCH_PLAYDAY_SUCCESS',
  current: IPlayday
}

type playdayError = {
  type: 'FETCH_PLAYDAY_FAILURE',
  error: string
}

type playdayPostRequested = {
  type: 'FETCH_POST_PLAYDAY_REQUEST'
}

type playdayPostSuccess = {
  type: 'FETCH_POST_PLAYDAY_SUCCESS',
  current: IPlayday | null
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
