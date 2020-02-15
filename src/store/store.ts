import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';

import authReducer from './reducers/authReducer';
import generatorReducer from './reducers/generatorReducer';
import playdayReducer from './reducers/playdayReducer';
import playerReducer from './reducers/playerReducer';

import { AppActions } from 'types';

const reducers = combineReducers({
  auth: authReducer,
  generator: generatorReducer,
  playday: playdayReducer,
  player: playerReducer,
});

// tslint:disable-next-line:max-line-length
const composeEnhancers = ((window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__())  || compose;

export type AppState = ReturnType<typeof reducers>;

const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>),
    composeEnhancers,
  ),
);

export default store;
