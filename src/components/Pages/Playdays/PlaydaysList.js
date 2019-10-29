import React from 'react';
import {Link} from 'react-router-dom';

const PlaydaysList = ({list, current}) => {

  if (!list.length) return null;

  const items = list.map(({_id, name}) => {

    const activeClass = name === current ? 'active': '';

    return (
        <Link
            to={`/playdays/${name}`}
            className={`list-group-item list-group-item-action ${activeClass}`} key={_id}>
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
