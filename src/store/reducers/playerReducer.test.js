import {
  playerListError,
  playerListLoaded,
  playerListRequested,
  playerLoaded,
  playerPostRequested,
  playerPostSuccess, playerRequested,
  playersSetFree,
} from 'store/actions/player';
import playerReducer from 'store/reducers/playerReducer';

const state = {
  current: null,
  error: '',
  freePlayers: [],
  list: [],
  loading: false,
  selected: [],
};

const players = [
  {_id: '1', name: 'Petya', handle: 'petr', box: 1},
  {_id: '2', name: 'Kolya', handle: 'kolya', box: 1},
];

it('FETCH_PLAYERS_REQUEST', () => {
  const action = playerListRequested();
  const newState = playerReducer(state, action);

  expect(newState.loading).toBe(true);
  expect(newState.error).toBe('');
});

it('FETCH_PLAYERS_SUCCESS', () => {
  const action = playerListLoaded(players);
  const newState = playerReducer(state, action);

  expect(newState.list.length).toBe(2);
  expect(newState.loading).toBe(false);
  expect(newState.error).toBe('');

});

it('FETCH_PLAYERS_FAILURE', () => {
  const action = playerListError('Error message');
  const newState = playerReducer(state, action);

  expect(newState.loading).toBe(false);
  expect(newState.error).toBe('Error message');
});

it('FETCH_PLAYER_REQUEST', () => {
  const action = playerRequested();
  const newState = playerReducer(state, action);

  expect(newState.loading).toBe(true);
});

it('FETCH_PLAYER_SUCCESS', () => {
  const action = playerLoaded(players[1]);
  const newState = playerReducer(state, action);

  expect(newState.loading).toBe(false);
  expect(newState.current.name).toBe('Kolya');
});

it('FETCH_PLAYER_FAILURE', () => {
  const action = playerListError('Error');
  const newState = playerReducer(state, action);

  expect(newState.loading).toBe(false);
  expect(newState.error).toBe('Error');
});

it('FETCH_POST_PLAYER_REQUEST', () => {
  const action = playerPostRequested();
  const newState = playerReducer(state, action);

  expect(newState.loading).toBe(true);
});

it('FETCH_POST_PLAYER_SUCCESS', () => {
  const action = playerPostSuccess({_id: '123', name: 'Vasya', handle: 'vas', box: 1});
  const newState = playerReducer(state, action);

  expect(newState.current.name).toBe('Vasya');
  expect(newState.loading).toBe(false);
});

it('SET_FREE_PLAYERS', () => {
  const action = playersSetFree(players);
  const newState = playerReducer(state, action);

  expect(newState.freePlayers.length).toBe(2);
});
