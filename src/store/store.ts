import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import authReducer from './reducers/authReducer';
import thunk, {ThunkMiddleware} from "redux-thunk";
import {reducer as formReducer} from 'redux-form';
import playerReducer from './reducers/playerReducer';
import generatorReducer from './reducers/generatorReducer';
import playdayReducer from './reducers/playdayReducer';
import {AppActions} from '../types';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

let reducers = combineReducers({
  auth: authReducer,
  player: playerReducer,
  generator: generatorReducer,
  playday: playdayReducer,
  form: formReducer
});

//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export type AppState = ReturnType<typeof reducers>

const store = createStore(
    reducers,
    compose(
        applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>),
        //composeEnhancers()
    )
);

export default store;
