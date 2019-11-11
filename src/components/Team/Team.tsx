import React from 'react';
import IPlayer from '../../types/interface/IPlayer';
import {Link} from 'react-router-dom';
import {ROUTE_PLAYERS} from '../../const/Routes';

interface Props {
  players: IPlayer[],
  title?: string,
  goals?: number
}

const Team: React.FC<Props> = ({players, title, goals}) => {

  if (!players.length) return null;

  const Total = () => {
    if (!goals) return null;
    return (
        <span className="badge badge-success ml-auto">
          {goals}
      </span>
    )
  };

  const list = players.map(player => {
    return (
        <div className="list-group-item d-flex align-items-center" key={player._id}>
          <img
              className="rounded-circle"
              src={player.image} alt={player.name} width="32"/>
          <Link to={`${ROUTE_PLAYERS}${player.handle}`} className="ml-2">{player.name}</Link>
        </div>
    )
  });

  return (
      <div className="list-group">
        <div
            className="list-group-item list-group-item-primary font-weight-bold d-flex align-items-center font-weight-bold">
          {title}
          <Total/>
        </div>
        {list}
      </div>
  );
};

export default React.memo(Team);
