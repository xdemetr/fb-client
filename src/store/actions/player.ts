import { Dispatch } from 'react';

import { playerAPI } from '../../api/api';
import { AppActions } from '../../types';

import { DEFAULT_PLAYER_IMAGE } from '../../const/Vars';
import IPlayer from '../../types/interface/IPlayer';

const playerListRequested = (): AppActions => ({
  type: 'FETCH_PLAYERS_REQUEST',
});

const playerListLoaded = (players: IPlayer[]): AppActions => ({
  players,
  type: 'FETCH_PLAYERS_SUCCESS',
});

const playerListError = (error: string): AppActions => ({
  error,
  type: 'FETCH_PLAYERS_FAILURE',
});

const playerRequested = (): AppActions => ({
  type: 'FETCH_PLAYER_REQUEST',
});

const playerLoaded = (player: IPlayer): AppActions => ({
  player,
  type: 'FETCH_PLAYER_SUCCESS',
});

const playerPostRequested = (): AppActions => ({
  type: 'FETCH_POST_PLAYER_REQUEST',
});

const playerPostSuccess = (player: IPlayer | null): AppActions => ({
  player,
  type: 'FETCH_POST_PLAYER_SUCCESS',
});

const playersSetFree = (players: IPlayer[]): AppActions => ({
  players,
  type: 'SET_FREE_PLAYERS',
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
    dispatch(playerLoaded(res.data));
  } catch (e) {
    console.error(e.message);
  }
};

export const setFreePlayers = (players: IPlayer[]) => (dispatch: Dispatch<AppActions>) => {
  dispatch(playersSetFree(players));
};

export const postPlayer = (
  player: IPlayer, history: any,
) => async (dispatch: Dispatch<AppActions>) => {
  dispatch(playerPostRequested());

  try {
    if (!player.image) {
      player.image = DEFAULT_PLAYER_IMAGE;
    }
    const res = await playerAPI.addPlayer(player);
    dispatch(playerPostSuccess(res.data));
    history.push('/players');
  } catch (e) {
    console.error(e.message);
  }
};

export const updatePlayer = (
  playerId: string, playerData: IPlayer, history: any,
) => async (dispatch: Dispatch<AppActions>) => {
  dispatch(playerPostRequested());

  try {
    if (!playerData.image) {
      playerData.image = DEFAULT_PLAYER_IMAGE;
    }

    const res = await playerAPI.updatePlayer(playerId, playerData);
    dispatch(playerPostSuccess(res.data));
    history.push('/players');
  } catch (e) {
    console.error(e.message);
  }
};

export const deletePlayer = (id: string, history: any) => async () => {
  try {
    const res = await playerAPI.deletePlayer(id);
    history.push('/players');
    // console.log(res.data);
    return res.data;
  } catch (e) {
    console.error(e.message);
  }
};

export const getCurrentPlayer = (id: string) => async (dispatch: Dispatch<AppActions>) => {
  dispatch(playerPostRequested());
  try {
    const res = await playerAPI.getPlayer(id);
    dispatch(playerPostSuccess(res.data));
  } catch (e) {
    console.error(e.message);
  }
};

export const getPlayerByHandle = (handle: string) => async (dispatch: Dispatch<AppActions>) => {
  dispatch(playerRequested());

  try {
    const res = await playerAPI.getPlayerByHandle(handle);
    dispatch(playerLoaded(res.data));
  } catch (e) {
    console.error(e);
  }
};

export const resetCurrentPlayer = () => (dispatch: Dispatch<AppActions>) => {
  dispatch(playerPostSuccess(null));
};
