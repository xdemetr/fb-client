import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';

import authReducer from './reducers/authReducer';
import generatorReducer from './reducers/generatorReducer';
import playdayReducer from './reducers/playdayReducer';
import playerReducer from './reducers/playerReducer';

import { AppActions } from 'types';

declare global {
  interface IWindow {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const reducers = combineReducers({
  auth: authReducer,
  generator: generatorReducer,
  playday: playdayReducer,
  player: playerReducer,
});

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export type AppState = ReturnType<typeof reducers>;

const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>),
    // composeEnhancers()
  ),
);

export default store;
