import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './components/App';
import {BrowserRouter} from 'react-router-dom';
import setAuthToken from './utils/set-auth-token';
import JwtDecode from 'jwt-decode';
import ITokenJWT from './types/interface/ITokenJWT';
import {logoutUser, setCurrentUser} from './store/actions/auth';
import store from './store/store';

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
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Provider store={store}>
        <App/>
      </Provider>
    </BrowserRouter>
    , document.getElementById('root'));
