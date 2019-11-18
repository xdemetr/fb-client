import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {getPlayerListReselect} from '../../../store/selectors/player';
import Spinner from '../../Spinner';
import GeneratorResult from './GeneratorResult';
import {getAuthReselect} from '../../../store/selectors/auth';
import {
  generatorPlayerSelected,
  generatorPlayersReset,
  generatorRun,
  generatorSaveResult
} from '../../../store/actions/generator';
import {
  getGeneratorErrors,
  getGeneratorResultReselect,
  getSelectedPlayersReselect
} from '../../../store/selectors/generator';
import {getPlayers} from '../../../store/actions/player';
import {AppState} from '../../../store/store';
import IPlayer from '../../../types/interface/IPlayer';
import ITeam from '../../../types/interface/ITeam';

interface Props {
  auth: any
  list: IPlayer[]
  selected: IPlayer[]
  result: ITeam[]
  errors?: string
  generatorPlayerSelected: (player: IPlayer) => void
  generatorPlayersReset: () => void
  generatorRun: (teams: Array<any>) => void
  generatorSaveResult: (result: ITeam[]) => void
  getPlayers: () => void
}

const GeneratorContainer: React.FC<Props> = (
    {
      auth,
      list, selected, result, errors,
      generatorPlayerSelected, generatorPlayersReset, generatorRun, generatorSaveResult,
      getPlayers
    }) => {

  useEffect(() => {
    getPlayers()
  },  [getPlayers]);

  if (!list) return <Spinner/>;

  const playerList = list.map((player) => {
    const {_id: id, name, damage} = player;
    const selectedClass = selected.find((pl) => pl._id === id) ? 'bg-success text-white' : '';
    const damageClass = damage ? 'card-muted' : '';

    return (
        <div key={id} className="col-6 col-md-3 mb-3" onClick={() => generatorPlayerSelected(player)}>
          <div className={`card p-2 ${selectedClass} ${damageClass}`}>
            {name}
          </div>
        </div>
    )
  });

  const SelectedCount = () => {
    if (!selected.length) return null;
    return <span className="badge badge-pill badge-info ml-2">{selected.length}</span>
  };

  const BtnGroup = () => {
    return <div className="btn-group-lg btn-group">
      <button className="btn-lg btn btn-primary" onClick={() => onGenerateClick()}>Получить составы</button>
      <button className="btn-lg btn btn-outline-primary" onClick={() => generatorPlayersReset()}>Сбросить выделение
      </button>
    </div>
  };

  const onSaveResult = () => {
    generatorSaveResult(result);
  };

  const onGenerateClick = () => {
    const players = selected;

    const getRandomInt = (min: number, max: number) => {
      return Math.floor(Math.random() * (max - min)) + min;
    };

    const playerToTeam = (team: IPlayer[], box1: IPlayer[], box2: IPlayer[], box3: IPlayer[]) => {
      let random = 0;
      let list = box1;

      if (list.length < 1) {
        list = box2;
      }
      if (list.length < 1) {
        list = box3;
      }
      if (list.length > 0) {
        random = getRandomInt(0, (list.length));
        team.push(list[random]);
        list.splice(random, 1);
      }
      return team;
    };

    let box1 = players.filter((e) => e.box === 1);
    let box2 = players.filter((e) => e.box === 2);
    let box3 = players.filter((e) => e.box === 3);

    let team1:IPlayer[] = [];
    let team2:IPlayer[] = [];
    let team3:IPlayer[] = [];

    players.map(() => {
      team1 = playerToTeam(team1, box1, box2, box3);
      team2 = playerToTeam(team2, box1, box2, box3);

      if (players.length >= 15) {
        team3 = playerToTeam(team3, box1, box2, box3);
      }

      return [team1, team2, team3];
    });

    generatorRun([team1, team2, team3])
  };

  return (
      <div className="generator-page">
        <h1 className="d-flex">
          Генератор
          <SelectedCount/>
        </h1>

        <div className="row">
          {playerList}
        </div>

        <BtnGroup/>

        <GeneratorResult
            auth={auth}
            errors={errors}
            result={result}
            onSaveResult={onSaveResult}/>
      </div>
  )
};

const mapStateToProps = (state: AppState) => ({
  list: getPlayerListReselect(state),
  selected: getSelectedPlayersReselect(state),
  result: getGeneratorResultReselect(state),
  errors: getGeneratorErrors(state),
  auth: getAuthReselect(state)
});

const mapDispatchToProps = {
  getPlayers, generatorRun,
  generatorPlayerSelected, generatorPlayersReset, generatorSaveResult,
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(GeneratorContainer));
