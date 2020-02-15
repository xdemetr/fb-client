import React, { useEffect } from 'react';

import * as generatorActions from 'store/actions/generator';
import * as playerActions from 'store/actions/player';

import { connect } from 'react-redux';
import { getAuthReselect } from 'store/selectors/auth';
import { getGeneratorErrors, getGeneratorResultReselect, getSelectedPlayersReselect } from 'store/selectors/generator';
import { getPlayerErrorReselect, getPlayerListReselect } from 'store/selectors/player';
import { AppState } from 'store/store';

import Error from 'components/Error';
import Button from 'components/general/Button';
import Spinner from 'components/Spinner';
import GeneratorResult from './GeneratorResult';

import IPlayer from 'types/interface/IPlayer';
import ITeam from 'types/interface/ITeam';

import { TXT_GENERATOR_GET_TEAMS, TXT_PAGE_GENERATOR, TXT_RESET } from 'const/Vars';

interface IProps {
  auth: {
    isAuth: boolean;
  };
  list: IPlayer[];
  selected: IPlayer[];
  result: ITeam[];
  error?: string;
  errors?: string;
  generatorPlayerSelected: (player: IPlayer) => void;
  generatorPlayersReset: () => void;
  generatorRun: (teams: any[]) => void;
  generatorSaveResult: (result: ITeam[]) => void;
  getPlayers: () => void;
}

const GeneratorContainer: React.FC<IProps> = (
  {
    auth,
    list, selected, result, error, errors,
    generatorPlayerSelected, generatorPlayersReset, generatorRun, generatorSaveResult,
    getPlayers,
  }) => {

  useEffect(
    () => {
      getPlayers();
    },
    [getPlayers]);

  if (!list) {
    return <Spinner/>;
  }

  if (error) {
    return <Error message={error}/>;
  }

  const playerList = list.map((player) => {
    const { _id: id, name, damage } = player;
    const selectedClass = selected.find(pl => pl._id === id) ? 'bg-success text-white' : '';
    const damageClass = damage ? 'card-muted' : '';

    return (
      <div
        key={id}
        className="col-6 col-md-3 mb-3"
        onClick={() => generatorPlayerSelected(player)}
      >
        <div className={`card p-2 ${selectedClass} ${damageClass}`}>
          {name}
        </div>
      </div>
    );
  });

  const SelectedCount = () => {
    if (!selected.length) {
      return null;
    }
    return <span className="badge badge-pill badge-info ml-2">{selected.length}</span>;
  };

  const BtnGroup = () => {
    return (
      <div className="btn-group-lg btn-group">
        <Button onClick={onGenerateClick}>{TXT_GENERATOR_GET_TEAMS}</Button>
        <Button mod={'outline-primary'} onClick={generatorPlayersReset}>{TXT_RESET}</Button>
      </div>
    );
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
      let startList = box1;

      if (startList.length < 1) {
        startList = box2;
      }
      if (startList.length < 1) {
        startList = box3;
      }
      if (startList.length > 0) {
        random = getRandomInt(0, (startList.length));
        team.push(startList[random]);
        startList.splice(random, 1);
      }
      return team;
    };

    const resBox1 = players.filter(e => e.box === 1);
    const resBox2 = players.filter(e => e.box === 2);
    const resBox3 = players.filter(e => e.box === 3);

    let team1: IPlayer[] = [];
    let team2: IPlayer[] = [];
    let team3: IPlayer[] = [];

    players.map(() => {
      team1 = playerToTeam(team1, resBox1, resBox2, resBox3);
      team2 = playerToTeam(team2, resBox1, resBox2, resBox3);

      if (players.length >= 15) {
        team3 = playerToTeam(team3, resBox1, resBox2, resBox3);
      }

      return [team1, team2, team3];
    });

    generatorRun([team1, team2, team3]);
  };

  return (
    <div className="generator-page">
      <h1 className="d-flex">
        {TXT_PAGE_GENERATOR}
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
        onSaveResult={onSaveResult}
      />
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  auth: getAuthReselect(state),
  error: getPlayerErrorReselect(state),
  errors: getGeneratorErrors(state),
  list: getPlayerListReselect(state),
  result: getGeneratorResultReselect(state),
  selected: getSelectedPlayersReselect(state),
});

const mapDispatchToProps = {
  generatorPlayerSelected: generatorActions.generatorPlayerSelected,
  generatorPlayersReset: generatorActions.generatorPlayersReset,
  generatorRun: generatorActions.generatorRun,
  generatorSaveResult: generatorActions.generatorSaveResult,
  getPlayers: playerActions.getPlayers,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(React.memo(GeneratorContainer));
