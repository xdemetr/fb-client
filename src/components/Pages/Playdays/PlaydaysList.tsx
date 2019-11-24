import React from 'react';
import {Link} from 'react-router-dom';
import {ROUTE_PLAYDAYS} from '../../../const/Routes';
import cnames from 'classnames';

type Props = {
  list: Array<{ _id: string, name: string }>
  current: string
}

const PlaydaysList: React.FC<Props> = ({list, current}) => {

  if (!list.length) return null;

  const items = list.map(({_id, name}) => {
    return (
        <Link
            to={`${ROUTE_PLAYDAYS}${name}`}
            className={cnames('list-group-item list-group-item-action', {'active': name === current})}
            key={_id}>
          {name}
        </Link>
    )
  });

  return (
      <ul className="list-group">
        {items}
      </ul>
  );
};

export default PlaydaysList;
