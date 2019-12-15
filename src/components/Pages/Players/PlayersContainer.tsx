import React, {useEffect} from 'react';
import Players from './Players';
import {connect} from 'react-redux';
import {getPlayers} from '../../../store/actions/player';
import Spinner from '../../Spinner/Spinner';
import Error from '../../Error';
import {getPlayerErrorReselect, getPlayerListReselect, getPlayerLoadingReselect} from '../../../store/selectors/player';
import {compose} from 'redux';
import IPlayer from '../../../types/interface/IPlayer';
import {AppState} from '../../../store/store';
import {getAuthReselect} from '../../../store/selectors/auth';

type Props = {
  list: IPlayer[]
  loading: boolean
  error: string
  getPlayers: () => void
  auth: { isAuth?: boolean }
}

const PlayersContainer: React.FC<Props> = ({getPlayers, list, loading, error, auth: {isAuth}}) => {

  useEffect(() => {
    getPlayers()
  }, [getPlayers]);

  if (loading) {
    return <Spinner/>
  }

  if (error) {
    return <Error message={error}/>
  }

  return (
      <div className="players-page">
        <h1>Игроки</h1>
        <Players list={list} auth={isAuth}/>
      </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  list: getPlayerListReselect(state),
  loading: getPlayerLoadingReselect(state),
  error: getPlayerErrorReselect(state),
  auth: getAuthReselect(state)
});

export default compose(
    connect(mapStateToProps, {getPlayers})
)(React.memo(PlayersContainer))
