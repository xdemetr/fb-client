import React, {useEffect} from 'react';
import {AppState} from '../../../../store/store';
import {getPlaydayReselect} from '../../../../store/selectors/playday';
import IPlayday from '../../../../types/interface/IPlayday';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {getPlayday, playdayUpdateTeams, updatePlayday} from '../../../../store/actions/playday';
import Spinner from '../../../Spinner/Spinner';
import Team from '../../../Team/Team';
import PlaydayEditForm from './PlaydayEditForm';
import {getAuthReselect} from '../../../../store/selectors/auth';
import IPlayer from '../../../../types/interface/IPlayer';
import PlaydayAddPlayer from './PlaydayAddPlayer';
import {getPlayer, getPlayers} from '../../../../store/actions/player';
import {getPlayerFreeListReselect} from '../../../../store/selectors/player';

type Props = {
  getPlayday: (id: string) => void
  updatePlayday: (id: string, name: string, data: any, history?: any) => void
  getPlayers: () => void
  getPlayer: (playerId: string) => void
  current: IPlayday | null
  match: { params: { id: string } }
  size?: number
  history: any,
  auth: { isAuth: boolean }
  setFreePlayers: (players: IPlayer[]) => void
  freePlayers: IPlayer[],
  playdayUpdateTeams: (playerId: any, teamNumber: string, currentPlayday: IPlayday) => void
}

type PropsFormData = {
  id: string
  name: string
  res1: number
  res2: number
  res3?: number
}

const PlaydayEditContainer: React.FC<Props> = (
    {
      current, getPlayday, updatePlayday,
      match: {params: {id}},
      history, auth, getPlayers, freePlayers,
      playdayUpdateTeams
    }
) => {
  useEffect(() => {
    getPlayday(id);
    getPlayers();
  }, [getPlayers, getPlayday, id]);

  if (!current) return <Spinner/>;

  const {_id: currentId, name} = current;

  const onDeletePlayer = (data: IPlayer, team: any) => {
    playdayUpdateTeams(data._id, team, current)
  };

  const onAddPlayerToTeam = (data: IPlayer, team: any) => {
    playdayUpdateTeams(Object.values(data)[0], team, current)
  };

  const onSubmit = (formData: PropsFormData) => {
    updatePlayday(currentId, name, {goals: Object.values(formData)}, history)
  };

  const teamList = current.teams.map((team, idx) => (
          <div className="col-md-4 mt-3 mt-md-0" key={idx}>
            <Team players={team}
                  color={idx}
                  deletePlayerFromTeam={onDeletePlayer}
                  auth={auth}
            />
            <PlaydayAddPlayer
                players={freePlayers}
                onSubmit={onAddPlayerToTeam} id={idx}/>
          </div>
      )
  );

  return (
      <div className="playday-edit-container">
        <h1>{name}</h1>

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
  current: getPlaydayReselect(state),
  auth: getAuthReselect(state),
  freePlayers: getPlayerFreeListReselect(state)
});

const mapDispatchToProps = {
  getPlayday, updatePlayday, getPlayer, getPlayers,
  playdayUpdateTeams
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(PlaydayEditContainer);
