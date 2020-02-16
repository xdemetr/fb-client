import { GeneratorActionTypes } from 'types/generatorActions';
import IPlayer from 'types/interface/IPlayer';
import ITeam from 'types/interface/ITeam';

const updateSelected = (state: any, player: IPlayer) => {
  let newSelected = [];
  const { selected } = state;
  const existPlayer = selected.find((pl: IPlayer) => pl._id === player._id);

  if (existPlayer) {
    const idx = selected.findIndex((pl: IPlayer) => pl._id === existPlayer._id);
    const newArr = [...selected.slice(0, idx), ...selected.slice(idx + 1)];
    newSelected = newArr;
  } else {
    const newArr = [...selected, player];
    newSelected = newArr;
  }

  return {
    ...state,
    selected: newSelected,
  };
};

const initialState = {
  error: '',
  loading: false,
  result: [] as ITeam[] | [],
  selected: [] as IPlayer[] | [],
};

type InitialStateType = typeof initialState;

const generatorReducer = (state = initialState, action: GeneratorActionTypes): InitialStateType => {
  switch (action.type) {
    case 'GENERATOR_PLAYER_SELECT':
      return updateSelected(state, action.player);

    case 'GENERATOR_RUN':
      return {
        ...state,
        result: action.teams,
      };

    case 'GENERATOR_SELECT_RESET':
      return {
        ...state,
        error: '',
        result: [],
        selected: [],
      };

    case 'GENERATOR_SAVE_FAILURE':
      return {
        ...state,
        error: action.error,
      };

    case 'GENERATOR_SAVE_REQUEST':
      return {
        ...state,
        loading: true,
      };

    case 'GENERATOR_SAVE_SUCCESS':
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default generatorReducer;
