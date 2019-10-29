import {
  GENERATOR_PLAYER_SELECT,
  GENERATOR_RESULT_RESET,
  GENERATOR_RUN,
  GENERATOR_SAVE_FAILURE,
  GENERATOR_SAVE_REQUEST,
  GENERATOR_SAVE_SUCCESS,
  GENERATOR_SELECT_RESET
} from "../types";

const updateSelected = (state, player) => {
  let newSelected = [];
  const { selected } = state;
  const existPlayer = selected.find((pl) => pl._id === player._id);

  if(existPlayer) {
    const idx = selected.findIndex((pl) => pl._id === existPlayer._id);
    const newArr = [...selected.slice(0, idx), ...selected.slice(idx+1)];
    newSelected = newArr
  } else {
    const newArr = [...selected, player];
    newSelected = newArr
  }

  return {
    ...state,
    selected: newSelected
  }
};

let initialState = {
  selected: [],
  result: [],
  errors: null,
  loading: false
};

const generatorReducer = (state = initialState, action) => {
  switch (action.type) {
    case GENERATOR_PLAYER_SELECT: {
      return updateSelected(state, action.payload);
    }

    case GENERATOR_RUN:
      return {
        ...state,
        result: action.payload
      };

    case GENERATOR_SELECT_RESET:
      return {
        ...state,
        selected: [],
        result: [],
        errors: null
      };

    case GENERATOR_RESULT_RESET:
      return {
        ...state,
        result: []
      };

    case GENERATOR_SAVE_FAILURE:
      return {
        ...state,
        errors: action.payload
      };

    case GENERATOR_SAVE_REQUEST:
      return {
        ...state,
        loading: true
      };

    case GENERATOR_SAVE_SUCCESS:
      return {
        ...state,
        loading: false
      };

    default:
      return state;
  }
};

export default generatorReducer;
