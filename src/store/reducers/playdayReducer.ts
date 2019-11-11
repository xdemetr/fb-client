import {
  FETCH_PLAYDAY_REQUEST,
  FETCH_PLAYDAY_SUCCESS,
  FETCH_PLAYDAYS_FAILURE,
  FETCH_PLAYDAYS_REQUEST,
  FETCH_PLAYDAYS_SUCCESS,
  FETCH_POST_PLAYDAY_REQUEST, FETCH_POST_PLAYDAY_SUCCESS,
  PlaydayActionTypes
} from '../../types/playdayActions';
import IPlayday from '../../types/interface/IPlayday';

interface playdayReducerState {
  list: Array<{ _id: string, name: string }>,
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
    case FETCH_PLAYDAYS_REQUEST: {
      return {
        ...state,
        loading: true
      }
    }

    case FETCH_PLAYDAYS_SUCCESS: {
      return {
        ...state,
        list: action.playdays,
        loading: false
      }
    }

    case FETCH_PLAYDAYS_FAILURE: {
      return {
        ...state,
        error: action.error
      }
    }

    case FETCH_PLAYDAY_REQUEST: {
      return {
        ...state,
        loading: true
      }
    }

    case FETCH_PLAYDAY_SUCCESS: {
      return {
        ...state,
        current: action.current,
        loading: false
      }
    }

    case FETCH_POST_PLAYDAY_REQUEST: {
      return {
        ...state,
        loading: true
      }
    }

    case FETCH_POST_PLAYDAY_SUCCESS: {
      return {
        ...state,
        current: action.playday
      }
    }

    default:
      return state;
  }
};

export default playdayReducer;
