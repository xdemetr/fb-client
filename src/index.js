import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './components/App';
import {BrowserRouter} from 'react-router-dom';
import {store} from './store';
import setAuthToken from './utils/set-auth-token';
import jwtDecode from 'jwt-decode';
import {logoutUser, setCurrentUser} from './store/actions/authActions';

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);

  const decoded = jwtDecode(localStorage.jwtToken);
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
