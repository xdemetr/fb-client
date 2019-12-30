import ITokenJWT from './interface/ITokenJWT';

interface IUserRequested {
  type: 'AUTH_USER_REQUEST';
}

interface IUserLoaded {
  type: 'AUTH_USER_SUCCESS';
  userData: ITokenJWT;
}

interface IUserLogout {
  type: 'LOGOUT_USER';
}

interface IUserError {
  type: 'AUTH_USER_FAILURE';
  error: string;
}

interface ISetCurrentUser {
  type: 'FETCH_USER_SUCCESS';
  decoded: ITokenJWT;
}

export type AuthActionTypes =
  | IUserRequested
  | IUserLoaded
  | IUserError
  | IUserLogout
  | ISetCurrentUser;
