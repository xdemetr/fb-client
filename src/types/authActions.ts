import ITokenJWT from './interface/ITokenJWT';

type userRequested = {
  type: 'AUTH_USER_REQUEST'
}

type userLoaded = {
  type: 'AUTH_USER_SUCCESS',
  userData: ITokenJWT
}

type userLogout = {
  type: 'LOGOUT_USER'
}

type userError = {
  type: 'AUTH_USER_FAILURE',
  error: string
}

type setCurrentUser = {
  type: 'FETCH_USER_SUCCESS',
  decoded: ITokenJWT
}

export type AuthActionTypes =
    | userRequested
    | userLoaded
    | userError
    | userLogout
    | setCurrentUser
