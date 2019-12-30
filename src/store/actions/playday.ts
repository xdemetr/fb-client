import { playdayAPI, playerAPI } from '../../api/api';

import { Dispatch } from 'react';
import { AppActions } from '../../types';

import IPlayday from '../../types/interface/IPlayday';
import IPlaydayList from '../../types/interface/IPlaydayList';
import IPlayer from '../../types/interface/IPlayer';
import { newTeams } from '../../utils/newTeams';

const playdayListRequested = (): AppActions => ({
  type: 'FETCH_PLAYDAYS_REQUEST',
});

const playdayListLoaded = (playdays: IPlaydayList[]): AppActions => ({
  playdays,
  type: 'FETCH_PLAYDAYS_SUCCESS',
});

const playdayListError = (error: string): AppActions => ({
  error,
  type: 'FETCH_PLAYDAYS_FAILURE',
});

const playdayRequested = (): AppActions => ({
  type: 'FETCH_PLAYDAY_REQUEST',
});

const playdayLoaded = (current: IPlayday): AppActions => ({
  current,
  type: 'FETCH_PLAYDAY_SUCCESS',
});

const playdayError = (error: string): AppActions => ({
  error,
  type: 'FETCH_PLAYDAY_FAILURE',
});

const playdayPostRequested = (): AppActions => ({
  type: 'FETCH_POST_PLAYDAY_REQUEST',
});

const playdayPostSuccess = (current: IPlayday): AppActions => ({
  current,
  type: 'FETCH_POST_PLAYDAY_SUCCESS',
});

const playdayPlayerRemove = (player: IPlayer, team: string): AppActions => ({
  data: { team, player },
  type: 'PLAYDAY_PLAYER_REMOVE',
});

export const playdayUpdateTeams = (
  playerId: string, teamNumber: string, current: IPlayday,
) => async (dispatch: Dispatch<AppActions>) => {
  try {
    const player = await playerAPI.getPlayer(playerId);
    dispatch(playdayPlayerRemove(player.data, teamNumber));
    const { teams } = current;

    const newPlayday = { ...current, teams: newTeams(teams, teamNumber, player.data) };

    try {
      const res = await playdayAPI.updatePlayday(newPlayday._id, newPlayday);
      dispatch(playdayPostSuccess(res.data));
    } catch (e) {
      console.error(e);
    }
  } catch (e) {
    console.error(e);
  }
};

export const getPlaydays = () => async (dispatch: Dispatch<AppActions>) => {
  dispatch(playdayListRequested());
  try {
    const res = await playdayAPI.getPlaydays();
    dispatch(playdayListLoaded(res.data));
  } catch (e) {
    dispatch(playdayListError(e.message));
  }
};

export const getPlayday = (id: string) => async (dispatch: Dispatch<AppActions>) => {
  dispatch(playdayRequested());

  try {
    const res = await playdayAPI.getPlayday(id);
    dispatch(playdayLoaded(res.data));
  } catch (e) {
    dispatch(playdayError(e.message));
  }
};

export const updatePlayday = (
  id: string, name: string, playdayData: any, history?: any,
) => async (dispatch: Dispatch<AppActions>) => {
  dispatch(playdayPostRequested());

  try {
    const res = await playdayAPI.updatePlayday(id, playdayData);
    dispatch(playdayPostSuccess(res.data));

    if (history) {
      history.push(`/playdays/${id}`);
    }
  } catch (e) {
    console.error(e);
  }
};
