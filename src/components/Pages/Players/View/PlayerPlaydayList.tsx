import React from 'react';
import {Link} from 'react-router-dom';
import {ROUTE_PLAYDAYS} from '../../../../const/Routes';

type Props = {
  playdays: Array<{ _id: string, name: string, result: number }> | null
}

const PlayerPlaydayList: React.FC<Props> = ({playdays}) => {

  if (!playdays) return null;

  const list = playdays.map(({_id, name, result}) => {
    return (
        <div className="list-group-item-action list-group-item" key={_id}>
          <Link to={`${ROUTE_PLAYDAYS}${name}`} className="mr-2">
            {name}
          </Link>
          {result > 0 && <span className="badge badge-success badge-pill">Победа</span>}
          {result < 0 && <span className="badge badge-danger badge-pill">Поражение</span>}
        </div>
    )
  });

  return (
      <div className="list-group">
        {list}
      </div>
  )
};

export default PlayerPlaydayList;
