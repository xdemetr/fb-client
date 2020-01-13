import { createSelector } from 'reselect';
import { AppState } from 'store/store';

const getAuth = (state: AppState) => {
  return state.auth;
};

export const getAuthReselect = createSelector(getAuth, auth => auth);
