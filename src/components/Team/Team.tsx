import React from 'react';
import IPlayer from '../../types/interface/IPlayer';
import {Link} from 'react-router-dom';
import {ROUTE_PLAYERS} from '../../const/Routes';
import './Team.css';

type Props = {
  players: IPlayer[]
  goals?: number,
  color: number,
  deletePlayerFromTeam?: any
  auth?: { isAuth: boolean }
  view?: 'compact' | 'default'
}

const Team: React.FC<Props> = ({players, goals, color, deletePlayerFromTeam, auth = false, view = 'default'}) => {
  if (!players.length) return null;

  const Total = () => {
    if (!goals) return null;
    return <span className="badge ml-auto">{goals}</span>
  };

  const teamData = [
    {color: 'red', title: 'Красные незабудки'},
    {color: 'blue', title: 'Синие снегири'},
    {color: 'white', title: 'Белые викинги'}
  ];

  const list = players.map(player => {
    const {_id, image, name, handle} = player;

    const DeleteButton = () => {
      if (!auth) return null;

      return (
          <button
              className="btn btn-sm btn-outline-danger ml-auto"
              onClick={() => deletePlayerFromTeam(player, color)}>X</button>
      )
    };

    return (
        <div className="list-group-item d-flex align-items-center team__player" key={_id}>
          <img
              className="rounded-circle team-player__image"
              src={image} alt={name} width="40"/>
          <Link to={`${ROUTE_PLAYERS}${handle}`} className="ml-2">{name}</Link>
          <DeleteButton/>
        </div>
    )
  });

  return (
      <div className={`list-group team team_color_${teamData[color].color} team_view_${view}`}>
        <div
            className="list-group-item list-group-item-primary d-flex align-items-center font-weight-bold">
          {teamData[color].title}
          <Total/>
        </div>
        {list}
      </div>
  );
};

export default React.memo(Team);
