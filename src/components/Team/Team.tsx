import React from 'react';
import IPlayer from '../../types/interface/IPlayer';
import {Link} from 'react-router-dom';
import {ROUTE_PLAYERS} from '../../const/Routes';

type Props = {
  players: IPlayer[]
  title?: string
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
    const {_id, image, name, handle} = player;

    return (
        <div className="list-group-item d-flex align-items-center" key={_id}>
          <img
              className="rounded-circle"
              src={image} alt={name} width="32"/>
          <Link to={`${ROUTE_PLAYERS}${handle}`} className="ml-2">{name}</Link>
        </div>
    )
  });

  return (
      <div className="list-group">
        <div
            className="list-group-item list-group-item-primary d-flex align-items-center font-weight-bold">
          {title}
          <Total/>
        </div>
        {list}
      </div>
  );
};

export default React.memo(Team);
