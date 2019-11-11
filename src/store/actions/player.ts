import {
  FETCH_PLAYER_REQUEST,
  FETCH_PLAYER_SUCCESS,
  FETCH_PLAYERS_FAILURE,
  FETCH_PLAYERS_REQUEST,
  FETCH_PLAYERS_SUCCESS,
  FETCH_POST_PLAYER_REQUEST,
  FETCH_POST_PLAYER_SUCCESS
} from '../../types/playerActions';
import {AppActions} from '../../types';
import IPlayer from '../../types/interface/IPlayer';
import {playerAPI} from '../../api/api';
import {Dispatch} from 'react';
import {DEFAULT_PLAYER_IMAGE} from '../../const/Vars';

const playerListRequested = (): AppActions => ({
  type: FETCH_PLAYERS_REQUEST
});

const playerListLoaded = (players: IPlayer[]): AppActions => ({
  type: FETCH_PLAYERS_SUCCESS,
  players
});

const playerListError = (error: string): AppActions => ({
  type: FETCH_PLAYERS_FAILURE,
  error
});

const playerRequested = (): AppActions => ({
  type: FETCH_PLAYER_REQUEST
});

const playerLoaded = (player: IPlayer): AppActions => ({
  type: FETCH_PLAYER_SUCCESS,
  player
});

const playerPostRequested = (): AppActions => ({
  type: FETCH_POST_PLAYER_REQUEST
});

const playerPostSuccess = (player: IPlayer | null): AppActions => ({
  type: FETCH_POST_PLAYER_SUCCESS,
  player
});

export const getPlayers = () => async (dispatch: Dispatch<AppActions>) => {
  dispatch(playerListRequested());

  try {
    const res = await playerAPI.getPlayerList();
    dispatch(playerListLoaded(res.data));
  } catch (e) {
    dispatch(playerListError(e.message));
  }
};

export const getPlayer = (playerId: string) => async (dispatch: Dispatch<AppActions>) => {
  dispatch(playerRequested());

  try {
    const res = await playerAPI.getPlayer(playerId);
    dispatch(playerLoaded(res.data))
  } catch (e) {
    console.log(e.message)
  }
};

export const postPlayer = (player: IPlayer, history: any) => async (dispatch: Dispatch<AppActions>) => {
  dispatch(playerPostRequested());

  try {
    if (!player.image) {
      player.image = DEFAULT_PLAYER_IMAGE
    }
    const res = await playerAPI.addPlayer(player);
    dispatch(playerPostSuccess(res.data));
    history.push('/players');
  } catch (e) {
    console.log(e.message);
  }
};

export const updatePlayer = (playerId: string, playerData: IPlayer, history: any) => async (dispatch: Dispatch<AppActions>) => {
  dispatch(playerPostRequested());

  try {
    if (!playerData.image) {
      playerData.image = DEFAULT_PLAYER_IMAGE
    }

    const res = await playerAPI.updatePlayer(playerId, playerData);
    dispatch(playerPostSuccess(res.data));
    history.push('/players');
  } catch (e) {
    console.log(e.message)
  }
};

export const deletePlayer = (id: string, history: any) => async () => {
  try {
    const res = await playerAPI.deletePlayer(id);
    history.push('/players');
    console.log(res.data);
  } catch (e) {
    console.log(e.message)
  }
};

export const getCurrentPlayer = (id: string) => async (dispatch: Dispatch<AppActions>) => {
  dispatch(playerPostRequested());
  try {
    const res = await playerAPI.getPlayer(id);
    dispatch(playerPostSuccess(res.data));
  } catch (e) {
    console.log(e.message)
  }
};

export const getPlayerByHandle = (handle: string) => async (dispatch: Dispatch<AppActions>) => {
  dispatch(playerRequested());

  try {
    const res = await playerAPI.getPlayerByHandle(handle);
    dispatch(playerLoaded(res.data))
  }
  catch (e) {
    console.log(e);
  }
};

export const resetCurrentPlayer = () => (dispatch: Dispatch<AppActions>) => {
  dispatch(playerPostSuccess(null));
};
