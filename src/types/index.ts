import {AuthActionTypes} from './authActions';
import {GeneratorActionTypes} from './generatorActions';
import {PlaydayActionTypes} from './playdayActions';
import {PlayerActionTypes} from './playerActions';

export type AppActions =
    | AuthActionTypes
    | GeneratorActionTypes
    | PlaydayActionTypes
    | PlayerActionTypes
