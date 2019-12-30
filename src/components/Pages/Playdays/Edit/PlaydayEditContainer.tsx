import React, { useEffect } from 'react';

import * as actions from '../../../../store/actions/playday';
import * as playerActions from '../../../../store/actions/player';
import { AppState } from '../../../../store/store';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { getAuthReselect } from '../../../../store/selectors/auth';
import { getPlaydayReselect } from '../../../../store/selectors/playday';
import { getPlayerFreeListReselect } from '../../../../store/selectors/player';

import withAuthRedirect from '../../../../hoc/withAuthRedirect';
import Spinner from '../../../Spinner/Spinner';
import Team from '../../../Team/Team';
import PlaydayAddPlayer from './PlaydayAddPlayer';
import PlaydayEditForm from './PlaydayEditForm';
import PlaydayTitle from './PlaydayTitle';

import IPlayday from '../../../../types/interface/IPlayday';
import IPlayer from '../../../../types/interface/IPlayer';

interface IProps {
  getPlayday: (id: string) => void;
  updatePlayday: (id: string, name: string, data: any, history?: any) => void;
  getPlayers: () => void;
  getPlayer: (playerId: string) => void;
  current: IPlayday | null;
  match: { params: { id: string } };
  size?: number;
  history: any;
  auth: { isAuth: boolean };
  setFreePlayers: (players: IPlayer[]) => void;
  freePlayers: IPlayer[];
  playdayUpdateTeams: (playerId: any, teamNumber: string, currentPlayday: IPlayday) => void;
}

interface IPropsFormData {
  id: string;
  name: string;
  res1: number;
  res2: number;
  res3?: number;
}

const PlaydayEditContainer: React.FC<IProps> = (
  {
    current, getPlayday, updatePlayday,
    match: { params: { id } },
    history, auth, getPlayers, freePlayers,
    playdayUpdateTeams,
  },
) => {
  useEffect(
    () => {
      getPlayday(id);
      getPlayers();
    },
    [getPlayers, getPlayday, id]);

  if (!current) {
    return <Spinner/>;
  }

  const { _id: currentId, name } = current;

  const onDeletePlayer = (data: IPlayer, teamNumber: string) => {
    playdayUpdateTeams(data._id, teamNumber, current);
  };

  const onAddPlayerToTeam = (data: IPlayer, teamNumber: string) => {
    playdayUpdateTeams(Object.values(data)[0], teamNumber, current);
  };

  const onSubmit = (formData: IPropsFormData) => {
    updatePlayday(currentId, name, { goals: Object.values(formData) }, history);
  };

  const onTitleEdit = (formData: IPropsFormData) => {
    if (name !== formData.name) {
      updatePlayday(currentId, name, { name: formData.name });
    }
  };

  const teamList = current.teams.map((team, idx) => (
      <div className="col-md-4 mt-3 mt-md-0" key={idx}>
        <Team
          players={team}
          color={idx}
          deletePlayerFromTeam={onDeletePlayer}
          auth={auth}
        />
        <PlaydayAddPlayer
          players={freePlayers}
          onSubmit={onAddPlayerToTeam}
          id={idx}
        />
      </div>
    ),
  );

  return (
    <div className="playday-edit-container">
      <PlaydayTitle current={current} onSubmit={onTitleEdit}/>

      <PlaydayEditForm
        onSubmit={onSubmit}
        current={current}
      />

      <div className="row">
        {teamList}
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  auth: getAuthReselect(state),
  current: getPlaydayReselect(state),
  freePlayers: getPlayerFreeListReselect(state),
});

const mapDispatchToProps = {
  getPlayday: actions.getPlayday,
  getPlayer: playerActions.getPlayer,
  getPlayers: playerActions.getPlayers,
  playdayUpdateTeams: actions.playdayUpdateTeams,
  updatePlayday: actions.updatePlayday,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect,
)(PlaydayEditContainer);
