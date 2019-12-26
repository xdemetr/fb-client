import React from 'react';
import {Link} from 'react-router-dom';
import {ROUTE_PLAYDAYS} from '../../../../const/Routes';
import {IPlayerPlayday} from '../../../../types/interface/IPlayer';
import {TXT_LOSS, TXT_WIN} from '../../../../const/Vars';

type Props = {
  playdays: IPlayerPlayday[]
}

const PlayerPlaydayList: React.FC<Props> = ({playdays}) => {
  if (!playdays.length) return null;

  const list = playdays.map(({_id, name, playday, result}) => {
    return (
        <div className="list-group-item-action list-group-item" key={_id}>
          <Link to={`${ROUTE_PLAYDAYS}${playday}`} className="mr-2">
            {name}
          </Link>
          {result > 0 && <span className="badge badge-success badge-pill">{TXT_WIN}</span>}
          {result < 0 && <span className="badge badge-danger badge-pill">{TXT_LOSS}</span>}
        </div>
    )
  });

  return (
      <div className="list-group">
        {list}
      </div>
  )
};

export default React.memo(PlayerPlaydayList);
