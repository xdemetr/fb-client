import React, {useEffect} from 'react';
import Players from './Players';
import {connect} from 'react-redux';
import {getPlayers} from '../../../store/actions/playerActions';
import Spinner from '../../Spinner';
import Error from '../../Error';
import {
  getPlayerErrorReselect,
  getPlayerListReselect,
  getPlayerLoadingReselect
} from '../../../store/selectors/player';
import {compose} from 'redux';
import withAuthRedirect from '../../../hoc/withAuthRedirect';

//const PlayersContainer = ({getPlayers, list, loading, error}) => {
const PlayersContainer = React.memo(({getPlayers, list, loading, error}) => {

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
});

const mapStateToProps = (state) => ({
  list: getPlayerListReselect(state),
  loading: getPlayerLoadingReselect(state),
  error: getPlayerErrorReselect(state)
});

export default compose(
    connect(mapStateToProps, {getPlayers}),
    withAuthRedirect
)(PlayersContainer)
