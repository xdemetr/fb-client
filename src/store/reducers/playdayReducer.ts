import { PlaydayActionTypes } from 'types/playdayActions';
import { newTeams } from 'utils/newTeams';

import IPlayday from 'types/interface/IPlayday';
import IPlaydayList from 'types/interface/IPlaydayList';
import IPlayer from 'types/interface/IPlayer';

const updateExistPlayday = (state: any, data: { player: IPlayer, team: string }) => {
  return {
    ...state,
    current: {
      ...state.current,
      teams: newTeams(state.current.teams, data.team, data.player),
    },
  };
};

const initialState = {
  current: null as IPlayday | null,
  error: '',
  freePlayers: [] as IPlayer[] | [],
  list: [] as IPlaydayList[] | [],
  loading: false,
};

type InitialStateType = typeof initialState;

const playdayReducer = (state = initialState, action: PlaydayActionTypes): InitialStateType => {
  switch (action.type) {
    case 'FETCH_PLAYDAYS_REQUEST':
      return {
        ...state,
        loading: true,
      };

    case 'FETCH_PLAYDAYS_SUCCESS':
      return {
        ...state,
        list: action.playdays,
        loading: false,
      };

    case 'FETCH_PLAYDAYS_FAILURE':
      return {
        ...state,
        error: action.error,
        loading: false,
      };

    case 'FETCH_PLAYDAY_REQUEST':
      return {
        ...state,
        loading: true,
      };

    case 'FETCH_PLAYDAY_SUCCESS':
      return {
        ...state,
        current: action.current,
        loading: false,
      };

    case 'FETCH_POST_PLAYDAY_REQUEST':
      return {
        ...state,
        loading: true,
      };

    case 'FETCH_POST_PLAYDAY_SUCCESS':
      return {
        ...state,
        current: action.current,
        loading: false,
      };

    case 'PLAYDAY_PLAYER_REMOVE':
      return updateExistPlayday(state, action.data);

    case 'PLAYDAY_PLAYER_ADD':
      return updateExistPlayday(state, action.data);

    default:
      return state;
  }
};

export default playdayReducer;
