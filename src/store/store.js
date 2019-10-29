import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import authReducer from './reducers/authReducer';
import thunkMiddleware from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';
import playerReducer from './reducers/playerReducer';
import generatorReducer from './reducers/generatorReducer';
import playdayReducer from './reducers/playdayReducer';

let reducers = combineReducers({
  auth: authReducer,
  player: playerReducer,
  generator: generatorReducer,
  playday: playdayReducer,
  form: formReducer
});

const store = createStore(
    reducers,
    compose(
        applyMiddleware(thunkMiddleware),
        //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;
