import React from 'react';
import IPlayer from '../../types/interface/IPlayer';

interface Props {
  players: IPlayer[],
  title?: string
}

const Team: React.FC<Props> = ({players, title}) => {

  if (!players.length) return null;

  const list = players.map(player => {
    return (
        <div className="list-group-item d-flex align-items-center" key={player._id}>
          <img
              className="rounded-circle"
              src={player.image} alt={player.name} width="32"/>
          <span className="ml-2">{player.name}</span>
        </div>
    )
  });

  return (
      <div className="list-group">
        <div className="list-group-item list-group-item-primary font-weight-bold">{title}</div>
        {list}
      </div>
  );
};

export default React.memo(Team);
