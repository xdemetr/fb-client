import React from 'react';
import {connect} from 'react-redux';
import {getPlayerListReselect} from '../../../store/selectors/player';
import {getPlayers} from '../../../store/actions/playerActions';
import Spinner from '../../Spinner';
import {
  generatorPlayerSelected,
  generatorPlayersReset,
  generatorRun,
  generatorSaveResult
} from '../../../store/actions/generatorActions';
import {
  getGeneratorErrors,
  getGeneratorResultReselect,
  getSelectedPlayersReselect
} from '../../../store/selectors/generator';
import GeneratorResult from './GeneratorResult';
import {getAuthReselect} from '../../../store/selectors/auth';

class GeneratorContainer extends React.PureComponent{

  componentDidMount() {
    this.props.getPlayers();
  }

  render() {
    const {
      auth,
      list, selected, result, errors,
      generatorPlayerSelected, generatorPlayersReset, generatorRun, generatorSaveResult
    } = this.props;

    if (!list.length) return <Spinner/>;

    const playerList = list.map((player) => {
      const {_id: id, name, damage} = player;
      const selectedClass = selected.find((pl) => pl._id === id) ? 'bg-success text-white' : '';
      const damageClass = damage ? 'card-muted': '';

      return(
          <div key={id} className="col-sm-6 col-md-3 mb-3" onClick={() => generatorPlayerSelected(player)}>
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

    const onGenerateClick = () => {
      const players = this.props.selected;

      const getRandomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min)) + min;
      };

      const playerToTeam =(team, box1, box2, box3) => {
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

      let box1 = players.filter((e)=> e.box === 1);
      let box2 = players.filter((e)=> e.box === 2);
      let box3 = players.filter((e)=> e.box === 3);

      let team1 = []; let team2 = []; let team3 = [];

      players.map(() => {
        team1 = playerToTeam(team1, box1, box2, box3);
        team2 = playerToTeam(team2, box1, box2, box3);

        if (players.length >= 15) {
          team3 = playerToTeam(team3, box1, box2, box3);
        }

        return (team1, team2, team3);
      });

      generatorRun([team1, team2, team3])
    };

    const BtnGroup = () => {
      return  <div className="btn-group-lg btn-group">
        <button className="btn-lg btn btn-primary" onClick={() => onGenerateClick()}>Получить составы</button>
        <button className="btn-lg btn btn-outline-primary" onClick={() => generatorPlayersReset()}>Сбросить выделение</button>
      </div>
    };

    const onSaveResult = () => {
      generatorSaveResult(result);
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
              onSaveResult={onSaveResult} />
        </div>
    )
  }
};

const mapStateToProps = (state) => ({
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

export default connect(mapStateToProps, mapDispatchToProps)(GeneratorContainer);
