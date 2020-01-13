import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from 'components/App';

import JwtDecode from 'jwt-decode';
import setAuthToken from 'utils/set-auth-token';

import { logoutUser, setCurrentUser } from 'store/actions/auth';
import store from 'store/store';
import ITokenJWT from 'types/interface/ITokenJWT';

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);

  const decoded = JwtDecode<ITokenJWT>(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  }
}

ReactDOM.render(
  // tslint:disable-next-line:jsx-wrap-multiline
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Provider store={store}>
      <App/>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'));
