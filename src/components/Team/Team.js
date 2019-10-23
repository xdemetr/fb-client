import React from 'react';

const Team = React.memo(({players, title}) => {
  const list = players.map(player => {
    return (
        <div className="list-group-item d-flex align-items-center" key={player._id}>
          <img
              className="rounded-circle"
              src={player.image} alt={player.name} width="32" />
          <span className="ml-2">{player.name}</span>
        </div>
    )
  });

  return (
      <div className="list-group-flush">
        <div className="list-group-item list-group-item-primary font-weight-bold">{title}</div>
        {list}
      </div>
  );
});

export default Team;
