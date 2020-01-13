import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { compose } from 'redux';
import * as actions from 'store/actions/player';
import { getPlayerCurrentReselect, getPlayerLoadingReselect } from 'store/selectors/player';
import { AppState } from 'store/store';

import Spinner from 'components/Spinner';
import PlayerPlaydayList from './PlayerPlaydayList';

import { TXT_LABEL_BOX } from 'const/Vars';
import IPlayer from 'types/interface/IPlayer';

interface IProps {
  match: any;
  getPlayerByHandle: (handle: string) => void;
  current: IPlayer | null;
  loading: boolean;
}

const PlayerView: React.FC<IProps> = (
  {
    match: { params: { handle } },
    getPlayerByHandle,
    current,
    loading,
  },
) => {
  useEffect(
    () => {
      getPlayerByHandle(handle);
    },
    [getPlayerByHandle, handle]);

  if (!current) {
    return null;
  }
  if (loading) {
    return <Spinner/>;
  }

  const { name, image, box, playdays } = current;

  return (
    <div className="player-view card">
      <div className="card-header d-flex align-items-center">
        <h1>{name}</h1>
        <span
          className="ml-auto badge-success badge badge-pill"
          title={TXT_LABEL_BOX}
        >
          {box}
        </span>
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
  loading: getPlayerLoadingReselect(state),
});

export default compose(
  connect(mapStateToProps, { getPlayerByHandle: actions.getPlayerByHandle }),
)(PlayerView);
