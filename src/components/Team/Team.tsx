import React from 'react';
import IPlayer from '../../types/interface/IPlayer';
import { Link } from 'react-router-dom';
import { ROUTE_PLAYERS } from '../../const/Routes';
import './Team.css';

type Props = {
  players: IPlayer[]
  title?: string
  goals?: number,
  color: number
}

const Team: React.FC<Props> = ({ players, title, goals, color }) => {
  if (!players.length) return null;

  const Total = () => {
    if (!goals) return null;
    return <span className="badge ml-auto">{goals}</span>
  };

  let teamColor;

  switch (color) {
    case 0: teamColor = 'red'; break;
    case 1: teamColor = 'blue'; break;
  }

  const list = players.map(player => {
    const { _id, image, name, handle } = player;

    return (
      <div className="list-group-item d-flex align-items-center" key={_id}>
        <img
          className="rounded-circle team-player__image"
          src={image} alt={name} width="40" />
        <Link to={`${ROUTE_PLAYERS}${handle}`} className="ml-2">{name}</Link>
      </div>
    )
  });

  return (
    <div className={`list-group team team_color_${teamColor}`}>
      <div
        className="list-group-item list-group-item-primary d-flex align-items-center font-weight-bold">
        {title}
        <Total />
      </div>
      {list}
    </div>
  );
};

export default React.memo(Team);
