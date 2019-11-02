import {createSelector} from 'reselect';

const getAuth = (state) => {
  return state.auth;
};

export const getAuthReselect = createSelector(getAuth, auth => auth);
