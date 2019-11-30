import {PlaydayActionTypes} from '../../types/playdayActions';
import IPlayday from '../../types/interface/IPlayday';
import IPlaydayList from '../../types/interface/IPlaydayList';
import IPlayer from '../../types/interface/IPlayer';

const updateExistPlayday = (state: any, data: { player: IPlayer, team: string }) => {
  const newTeams = state.current.teams.map((team: any, idx: any) => {
    if (idx === data.team) {
      const existPlayer: IPlayer = team.find((pl: IPlayer) => pl._id === data.player._id);

      if (existPlayer) {
        const idx = team.findIndex((pl: IPlayer) => pl._id === existPlayer._id);
        team = [...team.slice(0, idx), ...team.slice(idx + 1)];
      } else {
        team = [...team, data.player]
      }
    }
    return team
  });

  return {
    ...state,
    current: {
      ...state.current,
      teams: newTeams
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
