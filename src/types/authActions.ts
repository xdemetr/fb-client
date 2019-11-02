import ITokenJWT from './interface/ITokenJWT';

export const AUTH_USER_REQUEST = 'AUTH_USER_REQUEST';
export const AUTH_USER_SUCCESS = 'AUTH_USER_SUCCESS';
export const AUTH_USER_FAILURE = 'AUTH_USER_FAILURE';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';

export const LOGOUT_USER = 'LOGOUT_USER';
export const GET_PROFILE_REQUEST = 'GET_PROFILE_REQUEST';
export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';

interface userRequested {
  type: typeof AUTH_USER_REQUEST
}

interface userLoaded {
  type: typeof AUTH_USER_SUCCESS,
  userData: ITokenJWT
}

interface userLogout {
  type: typeof LOGOUT_USER
}

interface userError {
  type: typeof AUTH_USER_FAILURE,
  error: string
}

interface setCurrentUser {
  type: typeof FETCH_USER_SUCCESS,
  decoded: ITokenJWT
}

export type AuthActionTypes =
    | userRequested
    | userLoaded
    | userError
    | userLogout
    | setCurrentUser
