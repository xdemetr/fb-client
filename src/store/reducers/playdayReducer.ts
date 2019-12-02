import {PlaydayActionTypes} from '../../types/playdayActions';
import IPlayday from '../../types/interface/IPlayday';
import IPlaydayList from '../../types/interface/IPlaydayList';
import IPlayer from '../../types/interface/IPlayer';
import { newTeams } from '../../utils/newTeams';

const updateExistPlayday = (state: any, data: { player: IPlayer, team: string }) => {
  return {
    ...state,
    current: {
      ...state.current,
      teams: newTeams(state.current.teams, data.team, data.player)
    }
  }
};

type playdayReducerState = {
  list: IPlaydayList[],
  current: IPlayday | null,
  loading: boolean,
  freePlayers: IPlayer[]
  error: string
}

const playdayReducerDefaultState: playdayReducerState = {
  list: [],
  current: null,
  loading: false,
  freePlayers: [],
  error: ''
};

const playdayReducer = (
    state = playdayReducerDefaultState,
    action: PlaydayActionTypes
): playdayReducerState => {

  switch (action.type) {
    case 'FETCH_PLAYDAYS_REQUEST':
      return {
        ...state,
        loading: true
      };

    case 'FETCH_PLAYDAYS_SUCCESS':
      return {
        ...state,
        list: action.playdays,
        loading: false
      };

    case 'FETCH_PLAYDAYS_FAILURE':
      return {
        ...state,
        error: action.error
      };

    case 'FETCH_PLAYDAY_REQUEST':
      return {
        ...state,
        loading: true
      };

    case 'FETCH_PLAYDAY_SUCCESS':
      return {
        ...state,
        current: action.current,
        loading: false
      };

    case 'FETCH_POST_PLAYDAY_REQUEST':
      return {
        ...state,
        loading: true
      };

    case 'FETCH_POST_PLAYDAY_SUCCESS':
      return {
        ...state,
        current: action.current,
        loading: false
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
