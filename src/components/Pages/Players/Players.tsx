import React from 'react';

import cn from 'classnames';
import { Link } from 'react-router-dom';

import { ROUTE_EDIT_PLAYER, ROUTE_PLAYERS } from '../../../const/Routes';
import { TXT_EDIT } from '../../../const/Vars';
import IPlayer from '../../../types/interface/IPlayer';

interface IProps {
  list: IPlayer[];
  auth?: boolean;
}

const Players: React.FC<IProps> = ({ list, auth }) => {
  const playerList = list.map(({ name, image, box, _id: id, handle, damage }) => {

    const EditButton = () => {
      if (!auth) {
        return null;
      }

      return (
        <div className="card-footer p-0 text-right mt-3">
          <Link to={`${ROUTE_EDIT_PLAYER}${id}`} className="card-link small">{TXT_EDIT}</Link>
        </div>
      );
    };

    return (
      <div className="col-sm-3 mb-4" key={id}>
        <div className={cn('card bg-light', { 'card-muted': damage })}>
          <div className="card-body">
            <div className="d-flex align-items-center">
              <img
                className="rounded-circle border-dark border"
                src={image}
                alt={name}
                width="40"
              />

              <h5 className="card-title mb-0 ml-2">
                <Link to={`${ROUTE_PLAYERS}${handle}`}>{name}</Link>
              </h5>
              <span className="badge badge-pill badge-info ml-auto">{box}</span>
            </div>

            <EditButton/>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="row">
      {playerList}
    </div>
  );
};

export default React.memo(Players);
