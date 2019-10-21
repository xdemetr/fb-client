import React, {useEffect} from 'react';
import Players from './Players';
import {connect} from 'react-redux';
import {getPlayers} from '../../../store/actions/playerActions';
import Spinner from '../../Spinner';
import Error from '../../Error';
import {getPlayerError, getPlayerList, getPlayerLoading} from '../../../store/selectors/player';
import {compose} from 'redux';
import withAuthRedirect from '../../../hoc/withAuthRedirect';

const PlayersContainer = ({getPlayers, list, loading, error}) => {

  useEffect(() => {
    getPlayers()
  }, [getPlayers]);

  if (loading) {
    return <Spinner/>
  }

  if (error) {
    return <Error message={error} />
  }

  return (
      <div className="players-page">
        <h1>Игроки</h1>
        <Players list={list} />
      </div>
  );
};

const mapStateToProps = (state) => ({
  list: getPlayerList(state),
  loading: getPlayerLoading(state),
  error: getPlayerError(state)
});

export default compose(
    connect(mapStateToProps, {getPlayers}),
    withAuthRedirect
)(PlayersContainer)
