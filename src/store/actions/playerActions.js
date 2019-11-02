import {
  FETCH_PLAYERS_SUCCESS,
  FETCH_PLAYERS_FAILURE,
  FETCH_PLAYERS_REQUEST,
  FETCH_PLAYER_REQUEST,
  FETCH_PLAYER_SUCCESS,
  FETCH_POST_PLAYER_REQUEST,
  FETCH_POST_PLAYER_SUCCESS
} from '../types';
import {playerAPI} from '../../api/api';

const playerListRequested = () => {
  return {
    type: FETCH_PLAYERS_REQUEST
  }
};

const playerListLoaded = players => {
  return {
    type: FETCH_PLAYERS_SUCCESS,
    payload: players
  }
};

const playerListError = error => {
  return {
    type: FETCH_PLAYERS_FAILURE,
    payload: error
  }
};

const playerRequested = () => {
  return {
    type: FETCH_PLAYER_REQUEST
  }
};

const playerLoaded = player => {
  return {
    type: FETCH_PLAYER_SUCCESS,
    payload: player
  }
};

const playerPostRequested = () => {
  return {
    type: FETCH_POST_PLAYER_REQUEST
  }
};

const playerPostSuccess = player => {
  return {
    type: FETCH_POST_PLAYER_SUCCESS,
    payload: player
  }
};

export const getPlayers = () => async dispatch => {
  dispatch(playerListRequested());

  try {
    const res = await playerAPI.getPlayerList();
    dispatch(playerListLoaded(res.data));
  } catch (e) {
    dispatch(playerListError(e.message));
  }
};

export const getPlayer = playerId => async dispatch => {
  dispatch(playerRequested());

  try {
    const res = await playerAPI.getPlayer(playerId);
    dispatch(playerLoaded(res.data))
  } catch (e) {
    console.log(e.message)
  }
};

export const postPlayer = (player, history) => async dispatch => {
  dispatch(playerPostRequested());

  try {
    const res = await playerAPI.addPlayer(player);
    dispatch(playerPostSuccess(res.data));
    history.push('/players');
  } catch (e) {
    console.log(e.message);
  }
};

export const updatePlayer = (playerId, playerData, history) => async dispatch => {
  dispatch(playerPostRequested());

  try {
    const res = await playerAPI.updatePlayer(playerId, playerData);
    dispatch(playerPostSuccess(res.data));
    history.push('/players');
  } catch (e) {
    console.log(e.message)
  }
};

export const deletePlayer = (id, history) => async () => {
  try {
    const res = await playerAPI.deletePlayer(id);
    history.push('/players');
    console.log(res.data);
  } catch (e) {
    console.log(e.message)
  }
};

export const getCurrentPlayer = id => async dispatch => {
  try {
    const res = await playerAPI.getPlayer(id);
    dispatch(playerPostSuccess(res.data));
  } catch (e) {
    console.log(e.message)
  }
};

export const resetCurrentPlayer = () => dispatch => {
  dispatch(playerPostSuccess({}));
};
