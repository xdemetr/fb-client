import React from 'react';

import cnames from 'classnames';

import { ROUTE_PLAYDAYS } from 'const/Routes';
import { Link } from 'react-router-dom';

interface IListItem {
  _id: string;
  name: string;
}

interface IProps {
  list: IListItem[];
  current: string;
}

const PlaydaysList: React.FC<IProps> = ({ list, current }) => {

  if (!list.length) {
    return null;
  }

  const items = list.map(({ _id, name }) => {
    return (
      <Link
        to={`${ROUTE_PLAYDAYS}${_id}`}
        /* tslint:disable-next-line:max-line-length */
        className={cnames('list-group-item list-group-item-action', { active: _id === current })}
        key={_id}
      >
        {name}
      </Link>
    );
  });

  return (
    <ul className="list-group">
      {items}
    </ul>
  );
};

export default PlaydaysList;
