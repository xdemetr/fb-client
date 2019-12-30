import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { compose } from 'redux';
import * as actions from '../../../store/actions/player';
import { getAuthReselect } from '../../../store/selectors/auth';
import { getPlayerErrorReselect, getPlayerListReselect, getPlayerLoadingReselect } from '../../../store/selectors/player';
import { AppState } from '../../../store/store';

import Error from '../../Error';
import Spinner from '../../Spinner/Spinner';
import Players from './Players';

import { TXT_PAGE_PLAYERS } from '../../../const/Vars';
import IPlayer from '../../../types/interface/IPlayer';

interface IProps {
  list: IPlayer[];
  loading: boolean;
  error: string;
  getPlayers: () => void;
  auth: { isAuth?: boolean };
}

const PlayersContainer: React.FC<IProps> = (
  {
    getPlayers,
    list,
    loading,
    error,
    auth: { isAuth },
  }) => {

  useEffect(
    () => {
      getPlayers();
    },
    [getPlayers]);

  if (loading) {
    return <Spinner/>;
  }

  if (error) {
    return <Error message={error}/>;
  }

  return (
    <div className="players-page">
      <h1>{TXT_PAGE_PLAYERS}</h1>
      <Players list={list} auth={isAuth}/>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  auth: getAuthReselect(state),
  error: getPlayerErrorReselect(state),
  list: getPlayerListReselect(state),
  loading: getPlayerLoadingReselect(state),
});

export default compose(
  connect(mapStateToProps, { getPlayers: actions.getPlayers }),
)(React.memo(PlayersContainer));
