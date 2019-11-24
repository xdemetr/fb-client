import React, {useEffect} from 'react';
import IPlayer from '../../../../types/interface/IPlayer';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {AppState} from '../../../../store/store';
import {getPlayerByHandle} from '../../../../store/actions/player';
import {getPlayerCurrentReselect, getPlayerLoadingReselect} from '../../../../store/selectors/player';
import Spinner from '../../../Spinner/Spinner';
import PlayerPlaydayList from './PlayerPlaydayList';

interface Props extends IPlayer {
  match: any
  getPlayerByHandle: (handle: string) => void
  current: IPlayer | null
  loading: boolean
}

const PlayerView: React.FC<Props> = (
    {
      match: {params: {handle}},
      getPlayerByHandle,
      current,
      loading
    }
) => {
  useEffect(() => {
    getPlayerByHandle(handle)
  }, [getPlayerByHandle, handle]);

  if (!current) return null;
  if (loading) return <Spinner/>;

  const {name, image, box, playdays} = current;

  return (
      <div className="player-view card">
        <div className="card-header d-flex align-items-center">
          <h1>{name}</h1>
          <span className="ml-auto badge-success badge badge-pill" title="Корзина">{box}</span>
        </div>

        <div className="card-body d-flex">
          <img src={image} alt={name} width={80} height={80}/>

          <div className="flex-grow-1 ml-md-4">
            <PlayerPlaydayList playdays={playdays}/>
          </div>
        </div>
      </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  current: getPlayerCurrentReselect(state),
  loading: getPlayerLoadingReselect(state)
});

export default compose(
    connect(mapStateToProps, {getPlayerByHandle}),
)(PlayerView)
