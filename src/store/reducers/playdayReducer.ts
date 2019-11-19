import {PlaydayActionTypes} from '../../types/playdayActions';
import IPlayday from '../../types/interface/IPlayday';
import IPlaydayList from '../../types/interface/IPlaydayList';

interface playdayReducerState {
  list: IPlaydayList[],
  current: IPlayday | null,
  loading: boolean,
  error: string
}

const playdayReducerDefaultState: playdayReducerState = {
  list: [],
  current: null,
  loading: false,
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

    default:
      return state;
  }
};

export default playdayReducer;
