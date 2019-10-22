import React from 'react';
import {connect} from 'react-redux';
import {getPlayerList} from '../../../store/selectors/player';
import {getPlayers} from '../../../store/actions/playerActions';
import Spinner from '../../Spinner';
import {generatorPlayerSelected, generatorPlayersReset, generatorRun} from '../../../store/actions/generatorActions';
import {getSelectedPlayers} from '../../../store/selectors/generator';
import GeneratorResult from './GeneratorResult';

class GeneratorContainer extends React.Component{

  componentDidMount() {
    this.props.getPlayers();
  }

  render() {
    const {list, generatorPlayerSelected, generatorPlayersReset, generatorRun, selected, result} = this.props;


    if (!list) return <Spinner/>;

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

      //console.log(team1, team2, team3);
    };

    const BtnGroup = () => {
      return  <div className="btn-group-lg btn-group">
        <button className="btn-lg btn btn-primary" onClick={() => onGenerateClick()}>Получить составы</button>
        <button className="btn-lg btn btn-outline-primary" onClick={() => generatorPlayersReset()}>Сбросить выделение</button>
      </div>
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

          <GeneratorResult result={result} />
        </div>
    )
  }
};

const mapStateToProps = (state) => ({
  list: getPlayerList(state),
  selected: getSelectedPlayers(state),
  result: state.generator.result
});

export default connect(mapStateToProps, {getPlayers, generatorPlayerSelected, generatorPlayersReset, generatorRun})(GeneratorContainer);
